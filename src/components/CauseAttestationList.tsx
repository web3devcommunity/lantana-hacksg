import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { CauseAttestation } from '@/domain/cause-attestation';
import Badge from '@mui/material/Badge';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';


const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid`,
}));

export const CauseAttestationList = ({ causeAttestations }: { causeAttestations: CauseAttestation[] }) => {

    return (
        <div>
            <section>
                <h3>professional attestion</h3>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        causeAttestations.filter(cA => cA.isProfessional).map(
                            (causeAttestation: CauseAttestation) => {

                                return (
                                    <>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>

                                                <Badge
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    badgeContent={
                                                        <SmallAvatar src="/badge_climate.png" />
                                                    }
                                                >
                                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                                </Badge>


                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={causeAttestation.user.name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {causeAttestation.user.title}
                                                        </Typography>
                                                        {" — "}  {causeAttestation.comment}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </>
                                )
                            }
                        )
                    }
                </List>
            </section>
            <section>
                <h3>community support</h3>
                <Grid container alignItems="flex-start" >
                    <Grid item>
                        <AvatarGroup max={6} total={24}>
                            {
                                causeAttestations.filter(cA => !cA.isProfessional).map(
                                    (causeAttestation: CauseAttestation, i: number) => {
                                        return (
                                            <Avatar key={i} alt={causeAttestation.user.name} src="/static/images/avatar/1.jpg" />
                                        )
                                    })
                            }
                        </AvatarGroup>
                    </Grid>

                </Grid>


            </section>

        </div>
    )

}