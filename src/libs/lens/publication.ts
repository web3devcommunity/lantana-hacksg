import _ from 'lodash';

import {
  APP_VERSION_TAG,
  CURRENCY_WMATIC_ADDRESS,
  CURRENCY_LANTANA_ADDRESS,
  LENSTER_APP_ID,
} from '@/env';
import {
  LensClient,
  Profile,
  RelayerResultFragment,
  isRelayerResult,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  PublicationMetadataV2Input,
} from '@lens-protocol/client';
import { v4 as uuidv4 } from 'uuid';

import { uploadWithValues } from '../storage/file';
import { RelayerResult } from '@lens-protocol/client/dist/declarations/src/graphql/types.generated';

export enum PublicationStrategy {
  Post = 'post',
  Comment = 'comment',
}

export type PublicationInputBase = {
  profileId: string;
  name: string;
  metadata?: any;
  content: string;
  tags?: string[];
  collectModuleStrategy?: CollectionStrategy;
  collectModuleOptions?: Record<string, any>;
  attributes?: {
    traitType: string;
    value: string | number;
  }[];
  stats?: any;
  id?: string;
};

// TODO fix to carry strategy type
export type PostInput = PublicationInputBase & {
  imageUrl?: string;
};
export type CommentInput = PublicationInputBase & {
  imageUrl?: string;
};

type PublicationInput = PostInput | CommentInput;

// tags can be added but not returned at query (confirmed via MetadataOutput)
// Need both tag for filtering and attribute for display and in future use address over key for relationships
export const createPublicationMetadataFactory = (
  strategy: PublicationStrategy,
  {
    metadata,
    imageUrl,
    content,
    name,
    attributes = [],
    tags = [],
  }: PublicationInput,
) => {
  const baseMetadata = {
    // version: PublicationMetadataVersions.one,
    attributes: [
      ...attributes,
      {
        displayType: PublicationMetadataDisplayTypes.String,
        traitType: 'Created with',
        value: 'LensClient SDK',
      },
    ],
    version: '2.0.0',
    metadata_id: uuidv4(),
    locale: 'en-US',
    external_url: null,
    image: null,
    imageMimeType: null,
    name,
    tags: [APP_VERSION_TAG, ...(tags || [])],
    appId: LENSTER_APP_ID,
    content,

    ...metadata,
  };

  // For now, restrict comment to text only but not necessarily so in future
  if (strategy === PublicationStrategy.Post) {
    return {
      ...baseMetadata,
      mainContentFocus: PublicationMainFocus.Image,
      media: [
        {
          type: 'image/jpeg',
          altTag: 'image',
          // can be ipfs:// or https:
          item: imageUrl,
          // item: 'https://pbs.twimg.com/media/Fs4xCTGWYAULIW_?format=jpg&name=large'
        },
      ],
    };
  }

  if (strategy === PublicationStrategy.Comment) {
    return {
      ...baseMetadata,
      mainContentFocus: PublicationMainFocus.TextOnly,
    };
  }

  return {
    ...baseMetadata,
  };
};

export interface CreateCommentInput {
  profileId: string;
  name: string;
  content: string;
}

export const uploadMetadata =
  (lensClient: LensClient) => async (contentMetadata: any) => {
    // seems cid wrapped in directory is not supported. ensure configure at file client

    const validateResult = await lensClient.publication.validateMetadata(
      contentMetadata,
    );

    if (!validateResult.valid) {
      throw new Error('invalid metadata: ' + validateResult.reason);
    }
    const cid = await uploadWithValues([contentMetadata]);

    const contentURI = `ipfs://${cid}`;
    console.log('contentURI', contentURI, JSON.stringify(contentMetadata));

    return contentURI;
  };

export const createCommentWithClient =
  (lensClient: LensClient) =>
  async (publicationId: string, input: CreateCommentInput) => {
    console.log('createComment', publicationId, input);

    const { profileId } = input;

    const contentMetadata = createPublicationMetadataFactory(
      PublicationStrategy.Comment,
      {
        ...input,
      },
    );

    const contentURI = await uploadMetadata(lensClient)(contentMetadata);
    // create a comment via dispatcher, you need to have the dispatcher enabled for the profile
    const viaDispatcherResult =
      await lensClient.publication.createCommentViaDispatcher({
        profileId,
        publicationId,
        contentURI,
        collectModule: {
          revertCollectModule: true, // collect disabled
        },
        referenceModule: {
          followerOnlyReferenceModule: false, // anybody can comment or mirror
        },
      });

    return {
      contentMetadata,
      contentURI,
      viaDispatcherResult,
    };
  };

export const createCollectModule = (
  strategy: CollectionStrategy,
  options: Record<string, any> = {},
) => {
  // supports only 0-100 with 2dp
  const createBaseFeeCollectModule = (currency: string) => {
    return {
      feeCollectModule: {
        amount: {
          currency,
          value: '0.01',
        },
        followerOnly: false,
        /** The collect module recipient address */
        recipient: options['recipientAddress'],
        /** The collect module referral fee */
        referralFee: 0,
      },
    };
  };

  if (strategy === CollectionStrategy.Disabled) {
    return {
      revertCollectModule: true,
    };
  }
  //
  if (strategy === CollectionStrategy.Lantana) {
    return createBaseFeeCollectModule(CURRENCY_LANTANA_ADDRESS);
  }
  if (strategy === CollectionStrategy.Wmatic) {
    return createBaseFeeCollectModule(CURRENCY_WMATIC_ADDRESS);
  }

  return {
    freeCollectModule: {
      followerOnly: false,
    },
  };
};

export const createPostWithClient =
  (lensClient: LensClient) => async (input: PostInput) => {
    const { profileId, imageUrl, collectModuleOptions = {} } = input;

    const contentMetadata = createPublicationMetadataFactory(
      PublicationStrategy.Post,
      input,
    );

    const contentURI = await uploadMetadata(lensClient)(contentMetadata);

    const createViaDispatcherResult =
      await lensClient.publication.createPostViaDispatcher({
        profileId,
        contentURI,
        collectModule: createCollectModule(
          input?.collectModuleStrategy || CollectionStrategy.Free,
          collectModuleOptions,
        ),
        referenceModule: {
          followerOnlyReferenceModule: false, // anybody can comment or mirror
        },
      });

    console.log(
      'createViaDispatcherResult',
      createViaDispatcherResult.unwrap(),
    );

    return {
      ...(createViaDispatcherResult.unwrap() as RelayerResult),
      contentMetadata,
    };
  };

export enum CollectionStrategy {
  Free = 'free',
  Disabled = 'disabled',
  Lantana = 'lantana',
  Wmatic = 'wmatic',
}
