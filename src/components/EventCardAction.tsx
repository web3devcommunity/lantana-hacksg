import * as _ from 'lodash';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PaidIcon from '@mui/icons-material/Paid';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CommentIcon from '@mui/icons-material/Comment';
import TwitterIcon from '@mui/icons-material/Twitter';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { ProfileOwnedByMe, useActiveProfile, useCollect, useCreateMirror } from '@lens-protocol/react-web';
import styled from 'styled-components';


const MirrorButton = styled(IconButton) <{ isMirroredByMe: boolean }>`
color: ${props => (props.isMirroredByMe ? `blue` : `#757575`)};
`



export const EventCardActions = ({ profile, publication, collectAction, mirrorAction, isMirroredByMe = false }:
  {
    profile: ProfileOwnedByMe | null | undefined, publication: any,
    collectAction: () => void, mirrorAction: () => void,
    isMirroredByMe?: boolean
  }) => {


  // change the share link to respective cause
  return (
    <CardActions>
      <IconButton aria-label="vote up">
        <FavoriteIcon />
      </IconButton>
      <IconButton
        onClick={(event) => {
          event.preventDefault()
          collectAction();
        }}
        aria-label="support"
      >
        <VolunteerActivismIcon />
      </IconButton>
      <MirrorButton
        isMirroredByMe={isMirroredByMe}
        onClick={(event) => {
          event.preventDefault()
          mirrorAction();
        }}
        aria-label="share-to-lenster"
      >
        <SyncAltIcon />
      </MirrorButton>
      <IconButton
        aria-label="share-to-twitter"
        target="_blank"
        href="https://twitter.com/intent/tweet?text=Check%20out%20this%20cause&url=https://lantana.social/cause&via=Lantana&hashtags=lantana,lens,web3"
      ><TwitterIcon /></IconButton>

      {/* <IconButton aria-label="collect">
        <BookmarkAddIcon />
      </IconButton> */}
      <IconButton aria-label="stake">
        <PaidIcon />
      </IconButton>
      <IconButton aria-label="comment">
        <CommentIcon />
      </IconButton>
    </CardActions>
  );
};


// smart component to pick up profile while pure component to show psuedo actions in case of unconnected
// hack around lens sdk types to grouo conditionals
export const EventCardActionsWithProfile = ({ publication }: { publication: any }) => {

  const { data: activeProfile } = useActiveProfile();

  const { execute: collect } = useCollect({ collector: activeProfile as ProfileOwnedByMe, publication });

  const { execute: createMirror, isPending: isMirrorPending } = useCreateMirror({
    publisher: activeProfile!,
  });



  const isMirroredByMe = publication.isOptimisticMirroredByMe || publication.mirrors.length > 0;
  console.log('isMirrorPending', isMirrorPending, isMirroredByMe)

  const collectAction = activeProfile ? () => {
    // collect();
  } : _.noop;

  const mirrorAction = activeProfile && !isMirrorPending && !isMirroredByMe ? async () => {

    await createMirror({
      publication: publication,
    });
  } : _.noop;




  return <EventCardActions
    profile={activeProfile}
    publication={publication}
    collectAction={collectAction}
    mirrorAction={mirrorAction}
    isMirroredByMe={isMirroredByMe}
  />;

}