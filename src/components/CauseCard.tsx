import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { format, compareAsc, parseISO } from 'date-fns';
import { Cause, CauseInput } from '@/domain/cause';

import { useActiveProfile, useCollect } from '@lens-protocol/react-web';
import { AvatarGroup, Box } from '@mui/material';
import { User } from '@/domain/user';
import { withIpfsGateway } from '@/libs/lens/utils';

// @deprecated, replace with EventCard
// decouple lens specific actions / api from presentation
export const CauseCard = ({
  cause,
  actions,
  isThumbnailOnly = false,
}: {
  cause: Cause;
  actions?: any;
  isThumbnailOnly: boolean;
}) => {
  const { data, error, loading } = useActiveProfile();
  const collector = data!;

  // simplify do not show cause with no event
  const featuredEvent = cause?.events?.[0];
  if (!featuredEvent || !cause) return null;

  const displayedDate = format(featuredEvent.date, 'MM/dd/yyyy HH:mm');

  const imageUrl = withIpfsGateway(featuredEvent.imageUrl);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <>
            {featuredEvent.title} <br />
            <Typography color="text.secondary">by {cause.title}</Typography>
          </>
        }
        subheader={displayedDate}
      />
      {featuredEvent.imageUrl && (
        <CardMedia
          component="img"
          height="194"
          image={featuredEvent.imageUrl}
          alt="Post Image"
        />
      )}

      <AvatarGroup max={6} total={cause.volunteersCount}>
        {cause.volunteers.map((volunteer: Partial<User>, i: number) => {
          return (
            <Avatar
              key={i}
              alt={volunteer.name}
              src="/static/images/avatar/1.jpg"
            />
          );
        })}
      </AvatarGroup>

      {!isThumbnailOnly && (
        <CardContent>
          <Box m={1} >
            <Typography variant="body2" color="text.secondary">
              {featuredEvent.descriptionShort}
              <br />
              <b>{'totalComments'}</b>{' '}
              {featuredEvent.stats?.totalAmountOfComments}
              <b> {'totalMirrors'}</b> {featuredEvent.stats?.totalAmountOfMirrors}
            </Typography>
          </Box>
        </CardContent>
      )}
      {!isThumbnailOnly && actions}
    </Card>
  );
};
