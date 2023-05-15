import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { format, compareAsc, parseISO } from 'date-fns';
import { Cause, CauseInput } from '../domain/cause';
import RecommendIcon from '@mui/icons-material/Recommend';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import CommentIcon from '@mui/icons-material/Comment';
import PaidIcon from '@mui/icons-material/Paid';

import { useActiveProfile, useCollect } from '@lens-protocol/react-web';

export const CauseCardActions = ({ publication }: { publication: any }) => {
  const { data, error, loading } = useActiveProfile();
  console.log('active profile, data', data, loading);
  const collector = data!;
  const operations = useCollect({ collector, publication });
  const onSupportClicked = (evt: any) => {
    operations.execute();
  };

  return (
    <CardActions>
      <IconButton aria-label="vote up">
        <FavoriteIcon />
      </IconButton>
      <IconButton onClick={(evt) => onSupportClicked(evt)} aria-label="support">
        <VolunteerActivismIcon />
      </IconButton>

      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
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
