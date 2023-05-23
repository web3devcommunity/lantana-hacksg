import { PublicationId, useComments } from '@lens-protocol/react-web';
import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@mui/material';
import * as React from 'react';

type PublicationCommentsProps = {
  publicationId: PublicationId;
};

export function PublicationComments({
  publicationId,
}: PublicationCommentsProps) {
  const { data, loading } = useComments({ commentsOf: publicationId });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <>
        {data && (
          <List sx={{ width: '100%', maxWidth: 800 }}>
            {data.map((item: any, i) => (
              <div key={item.metadata.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={item.metadata.id}
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.profile.handle}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.createdAt}
                        </Typography>
                        {' -- ' + item.metadata.content}
                      </React.Fragment>
                    }
                  ></ListItemText>
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
        )}
      </>
    );
  } else return <p>No items</p>;
}
