import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PaidIcon from '@mui/icons-material/Paid';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CommentIcon from '@mui/icons-material/Comment';
import { useActiveProfile, useCollect } from '@lens-protocol/react-web';

export const EventCardActions = ({ publication }: { publication: any }) => {
  const { data, error, loading } = useActiveProfile();
  console.log('active profile, data', data, loading);
  const collector = data!;
  const operations = useCollect({ collector, publication });
  const onSupportClicked = (event: any) => {
    operations.execute();
  };

  // change the share link to respective cause
  return (
    <CardActions>
      <IconButton aria-label="vote up">
        <FavoriteIcon />
      </IconButton>
      <IconButton
        onClick={(event) => onSupportClicked(event)}
        aria-label="support"
      >
        <VolunteerActivismIcon />
      </IconButton>
      <IconButton
        aria-label="share-to-lenster"
        href="https://lenster.xyz?text=Check%20out%20this%20cause&url=https://lantana.social/cause&via=Lantana&hashtags=lantana,lens,web3"
      >
        <ShareIcon />
      </IconButton>
      <IconButton
        aria-label="share-to-twitter"
        href="https://twitter.com/intent/tweet?text=Check%20out%20this%20cause&url=https://lantana.social/cause&via=Lantana&hashtags=lantana,lens,web3"
      ></IconButton>
      <ShareIcon />
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
