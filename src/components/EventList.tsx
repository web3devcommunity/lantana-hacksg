import { Event, mapPublicationAsEvent } from '@/domain/event';
import {
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from '@mui/material';
import { EventCard } from './EventCard';
import styled from 'styled-components';
import Image from 'next/image';
import { withIpfsGateway } from '@/libs/lens/utils';
import { format } from 'date-fns';
import InfoIcon from '@mui/icons-material/Info';

// const EventListWrapper = styled.div`
//   a {
//     text-decoration: none;
//   }

// `;

// TODO group by upcoming vs past events
export const EventList = ({ events }: { events: Event[] }) => {
  return (
    // <EventListWrapper>
    //   <Grid container spacing={6}>
    //   {events.map((event, i) => {
    //     return (
    //       <Grid item key={i} className="item">
    //         <EventCard event={event} />
    //       </Grid>
    //     );
    //   })}
    // </Grid>
    // </EventListWrapper>

    <ImageList
      gap={10}
      sx={{
        width: '600px',
        height: '250px',
        gridAutoFlow: 'column',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px,200px)) !important',
        gridAutoColumns: 'minmax(200px,200px)',
      }}
    >
      {events.map((event) => (
        <ImageListItem key={event.title} sx={{ margin: '3px' }}>
          <Image
            src={withIpfsGateway(event.imageUrl)}
            alt={event.title}
            width={200}
            height={250}
          />
          <ImageListItemBar
            title={event.title}
            subtitle={format(event.date, 'MM/dd/yyyy HH:mm')}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${event.descriptionShort}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
