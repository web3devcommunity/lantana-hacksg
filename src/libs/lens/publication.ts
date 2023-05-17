import _ from 'lodash';
import { loadClientAuthenticated } from './client';
import { jest, describe, expect, it, beforeAll } from '@jest/globals';
import { ethers } from 'ethers';
import { APP_VERSION_TAG } from '../../env';
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
  attributes?: {
    traitType: string;
    value: string;
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

    content,

    mainContentFocus:
      strategy === PublicationStrategy.Post
        ? PublicationMainFocus.Image
        : PublicationMainFocus.TextOnly,

    // TODO support generic or do type detection for png
    media: [
      {
        type: 'image/jpeg',
        altTag: 'image',
        // can be ipfs:// or https:
        item: imageUrl,
        // item: 'https://pbs.twimg.com/media/Fs4xCTGWYAULIW_?format=jpg&name=large'
      },
    ],
    ...metadata,
  };

  if (strategy === 'post') {
    return {
      ...baseMetadata,
    };
  }
};

export const createComment = async (
  publicationId: string,
  wallet: ethers.Wallet,
  profileId: string,
  metadata = {},
) => {
  const lensClient = await loadClientAuthenticated({ wallet });

  console.log('createComment', publicationId, profileId, metadata);

  const contentMetadata = {
    attributes: [
      // {
      //   displayType: PublicationMetadataDisplayTypes.String,
      //   traitType: "Created with",
      //   value: "LensClient SDK",
      // },
    ],
    version: '2.0.0',
    metadata_id: uuidv4(),
    locale: 'en-US',
    external_url: null,
    image: null,
    imageMimeType: null,
    name: 'Post created with LensClient SDK',
    tags: [APP_VERSION_TAG],

    mainContentFocus: PublicationMainFocus.TextOnly,
    content: `Amazing!`,
    ...metadata,

    // mainContentFocus: PublicationMainFocus.Image,
    // media :[
    // {
    //   type: 'image/jpeg',
    //   altTag: 'image',
    //   // can be ipfs:// or https:
    //   // item: imageUrl
    //   // item: 'https://pbs.twimg.com/media/Fs4xCTGWYAULIW_?format=jpg&name=large'
    // }
    // ],
  };

  const cid = await uploadWithValues([contentMetadata]);
  // seems cid wrapped in directory is not supported. ensure configure at file client

  const contentURI = `ipfs://${cid}`;

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
  recipientAddress?: string,
) => {
  if (strategy === CollectionStrategy.Disabled) {
    return {
      revertCollectModule: true,
    };
  }
  if (strategy === CollectionStrategy.Lantana) {
    return {
      // feeCollectModule: {
      //   amount: {
      //     currency: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
      //     value: "0.01",
      //   },
      //   followerOnly: false,
      //   /** The collect module recipient address */
      //   recipient: recipientAddress,
      //   /** The collect module referral fee */
      //   referralFee: 0.2,
      // },
    };
  }
  return {
    freeCollectModule: {
      followerOnly: false,
    },
  };
};

export const createPostWithClient =
  (lensClient: LensClient) =>
  async (wallet: ethers.Wallet, input: PostInput) => {
    const { profileId, imageUrl } = input;
    // const lensClient = await loadClientAuthenticated({ wallet });

    const contentMetadata = createPublicationMetadataFactory(
      PublicationStrategy.Post,
      input,
    );

    // seems cid wrapped in directory is not supported. ensure configure at file client
    const cid = await uploadWithValues([contentMetadata]);

    const contentURI = `ipfs://${cid}`;

    console.log('contentURI', contentURI, JSON.stringify(contentMetadata));

    const validateResult = await lensClient.publication.validateMetadata(
      contentMetadata,
    );

    if (!validateResult.valid) {
      throw new Error('invalid metadata: ' + validateResult.reason);
    }

    const viaDispatcherResult =
      await lensClient.publication.createPostViaDispatcher({
        profileId,
        contentURI,
        collectModule: {
          revertCollectModule: true, // collect disabled
        },
        // collectModule: createCollectModule(CollectionStrategy.Free),
        referenceModule: {
          followerOnlyReferenceModule: false, // anybody can comment or mirror
        },
      });

    console.log('viaDispatcherResult', viaDispatcherResult.unwrap());

    return {
      ...(viaDispatcherResult.unwrap() as RelayerResult),
      contentMetadata,
    };
  };

export enum CollectionStrategy {
  Free = 'free',
  Disabled = 'disabled',
  Lantana = 'lantana',
}
