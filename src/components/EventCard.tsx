import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { format } from 'date-fns';
import { useActiveProfile } from '@lens-protocol/react-web';
import { Event } from '@/domain/event';
import { User } from '@/domain/user';
import { withIpfsGateway } from '@/libs/lens/utils';
import { EventCardActions } from '@/components/EventCardAction';

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
  const { data, loading } = useActiveProfile();
  const collector = data!;

  const imageUrl = withIpfsGateway(event.imageUrl);
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
          alt="Post Image"
        />
      )}

      <AvatarGroup max={6} total={event.volunteersCount}>
        {event.volunteers.map((volunteer: Partial<User>, i: number) => {
          return (
            <Avatar
              key={volunteer.name}
              alt={volunteer.name}
              src="/static/images/avatar/1.jpg"
            />
          );
        })}
      </AvatarGroup>
      {!isThumbnailOnly && event.descriptionShort}
      {!isThumbnailOnly && actions}
      <EventCardActions publication={null} />
    </Card>
  );
};
