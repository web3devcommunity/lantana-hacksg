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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { format, compareAsc, parseISO } from 'date-fns'
import { Cause, CauseInput } from '@/domain/cause';
import RecommendIcon from '@mui/icons-material/Recommend';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import CommentIcon from '@mui/icons-material/Comment';
import PaidIcon from '@mui/icons-material/Paid';
import { useActiveProfile, useCollect } from '@lens-protocol/react-web';
import { EventInput, Event } from '@/domain/event';
import { AvatarGroup } from '@mui/material';
import { User } from '@/domain/user';

// decouple lens specific actions / api from presentation
export const EventCard = ({ event, actions, isThumbnailOnly = false }: { event: Event, actions?: any, isThumbnailOnly: boolean }) => {

    const { data, error, loading } = useActiveProfile();
    const collector = data!;

    const displayedDate = format(event.date, 'MM/dd/yyyy HH:mm');

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader

                title={<>
                    {event.title} <br />

                </>}
                subheader={displayedDate}
            />
            {
                event.imageUrl && <CardMedia
                    component="img"
                    height="194"
                    image={event.imageUrl}
                    alt="Post Image"
                />
            }

            <AvatarGroup
                max={6} total={event.volunteersCounts}>
                {
                    event.volunteers.map(
                        (volunteer: Partial<User>, i: number) => {
                            return (
                                <Avatar key={i} alt={volunteer.name} src="/static/images/avatar/1.jpg" />
                            )
                        })
                }
            </AvatarGroup>
            {!isThumbnailOnly && event.descriptionShort}
            {!isThumbnailOnly && actions}

        </Card>
    );
}