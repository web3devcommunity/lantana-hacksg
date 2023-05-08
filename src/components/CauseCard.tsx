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

export const asCause = (cause: CauseInput): Cause => {

    return {
        title: cause.title!,
        date: parseISO(cause.date),
        descriptionShort: cause.descriptionShort || ''
    }
}

export const CauseCard = ({ cause }: { cause: Cause }) => {
    const displayedDate = format(cause.date, 'MM/dd/yyyy');

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
            <CardMedia
                component="img"
                height="194"
                image="/clean1.jpg"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {cause.descriptionShort}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="vote up">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="support">
                    <VolunteerActivismIcon />
                </IconButton>

                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="collect">
                    <BookmarkAddIcon />
                </IconButton>


            </CardActions>
            <CardContent>

            </CardContent>
        </Card>
    );
}