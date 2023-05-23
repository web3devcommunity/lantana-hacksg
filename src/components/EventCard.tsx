import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Image from 'next/image';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { format, compareAsc, parseISO } from 'date-fns';
import { Cause, CauseInput } from '@/domain/cause';
import RecommendIcon from '@mui/icons-material/Recommend';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import CommentIcon from '@mui/icons-material/Comment';
import PaidIcon from '@mui/icons-material/Paid';
import { useActiveProfile, useCollect } from '@lens-protocol/react-web';
import { EventInput, Event } from '@/domain/event';
import { AvatarGroup, Box } from '@mui/material';
import { User } from '@/domain/user';
import { getAvatarUrl, withIpfsGateway } from '@/libs/lens/utils';

// decouple lens specific actions / api from presentation
export const EventCard = ({
  event,
  actions,
  isThumbnailOnly = false,
}: {
  event: Event;
  actions?: any;
  isThumbnailOnly?: boolean;
}) => {
  const { data } = useActiveProfile();
  const collector = data!;

  const imageUrl = withIpfsGateway(event.imageUrl || '');
  const displayedDate = format(event.date, 'MM/dd/yyyy HH:mm');
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={
          <>
            {event.title} <br />
          </>
        }
        subheader={displayedDate}
      />
      {event.imageUrl && (
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt="Event Image"
        />
      )}

      <AvatarGroup max={6} total={event.volunteersCount} sx={{ mt: 2 }}>
        {event.volunteers.map((volunteer: Partial<User>, i: number) => {
          return (
            <Avatar
              key={volunteer.name! + i}
              alt={volunteer.name}
              src={getAvatarUrl()}
            />
          );
        })}
      </AvatarGroup>

      {!isThumbnailOnly && (
        <CardContent sx={{ minHeight: '2rem' }}>
          <Typography variant="body2" color="text.secondary">
            {event.descriptionShort}
          </Typography>
        </CardContent>
      )
      }
      {!isThumbnailOnly && actions}
    </Card >
  );
};
