import { Card, CardHeader, CardMedia, CardContent, Grid } from '@mui/material';
import { format } from 'date-fns';
import { Event } from '@/domain/event';
import { withIpfsGateway } from '@/libs/lens/utils';

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
  const imageUrl = withIpfsGateway(event.imageUrl);
  const displayedDate = format(new Date() || event.date, 'MM/dd/yyyy HH:mm');
  return (
    <Card
      raised
      sx={{
        width: '300px',
        height: '450px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={1}>
        <Grid item height={'100px'}>
          <CardHeader title={event.title} subheader={displayedDate} />
        </Grid>
        <Grid item>
          {event.imageUrl && (
            <CardMedia
              component="img"
              image={imageUrl}
              alt="Post Image"
              sx={{ height: '200px', width: '280px', margin: '10px' }}
            />
          )}
        </Grid>

        {/* <AvatarGroup max={6} total={event.volunteersCount}>
            {event.volunteers.map((volunteer: Partial<User>, i: number) => {
              return (
                <Avatar
                  key={i}
                  alt={volunteer.name}
                  src="/static/images/avatar/1.jpg"
                />
              );
            })}
          </AvatarGroup> */}
        <Grid
          item
          sx={{
            height: '60px',
            overflowY: 'auto',
          }}
        >
          <CardContent>{event.descriptionShort}</CardContent>
        </Grid>
        <Grid item>{actions}</Grid>
      </Grid>
    </Card>
  );
};
