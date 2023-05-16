import { Event, mapPublicationAsEvent } from '@/domain/event';
import { Grid } from '@mui/material';
import { EventCard } from './EventCard';
import styled from 'styled-components';

const EventListWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

// TODO group by upcoming vs past events
export const EventList = ({ events }: { events: Event[] }) => {
  return (
    <EventListWrapper>
      <Grid container spacing={6}>
        {events.map((event, i) => {
          return (
            <Grid item key={i} className="item">
              <EventCard event={event} />
            </Grid>
          );
        })}
      </Grid>
    </EventListWrapper>
  );
};
