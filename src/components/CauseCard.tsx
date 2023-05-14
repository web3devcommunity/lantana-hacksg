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

export const asCause = (cause: CauseInput): Cause => {

    return {
        title: cause.title!,
        date: parseISO(cause.date),
        imageUrl: cause.imageUrl || '',
        descriptionShort: cause.descriptionShort || '',
        stats: {},
        publicationId: cause.publicationId
    }
}

// decouple lens specific actions / api from presentation
export const CauseCard = ({ cause, actions }: { cause: Cause, actions?: any }) => {
    const displayedDate = format(cause.date, 'MM/dd/yyyy HH:mm');

    const { data, error, loading } = useActiveProfile();
    const collector = data!;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={cause.title}
                subheader={displayedDate}
            />
            {
                cause.imageUrl && <CardMedia
                    component="img"
                    height="194"
                    image={cause.imageUrl}
                    alt="Post Image"
                />
            }
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {cause.descriptionShort}
                    <br />
                    <b>{"totalComments"}</b> {cause.stats?.totalAmountOfComments}
                    <b> {"totalMirrors"}</b> {cause.stats?.totalAmountOfMirrors}
                </Typography>
            </CardContent>
            {actions}
            <CardContent>

            </CardContent>
        </Card>
    );
}