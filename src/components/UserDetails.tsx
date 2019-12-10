import React from 'react';
import { Paper, Typography, Divider, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IUser } from '.././pages/HomePage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        labelContainer: {
            minWidth: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: theme.spacing(1)
        },
        divider: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    }),
);

const UserDetails: React.FC<{ user: IUser }> = ({ user }) => {
    const classes = useStyles();

    return (
        <Paper>
            <Grid container spacing={1} justify="space-between">
                <Grid item>

                    <Grid container direction="column" spacing={1}>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Name</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">{`${user.name.title} ${user.name.first} ${user.name.last}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Gender</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.gender === "male" ? "Male" : "Female"}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Date of Birth</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.dob.date}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Age</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.dob.age}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Nationality</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.nat}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
                <Grid item>
                    <img alt={`${user.name.title} ${user.name.first} ${user.name.last}`} src={user.picture.large} style={{ borderRadius: "3px" }} />
                </Grid>
            </Grid>

            <Divider light className={classes.divider} />

            <Grid container spacing={1} justify="space-between">
                <Grid item>

                    <Grid container direction="column" spacing={1}>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Phone</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.phone}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Cell</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.cell}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Email</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.email}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Username</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.login.username}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>

            <Divider light className={classes.divider} />

            <Grid container spacing={1} justify="space-between">
                <Grid item>

                    <Grid container direction="column" spacing={1}>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Country</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.location.country}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">City</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.location.city}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">State</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.location.state}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Street Address</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{`${user.location.street.number} ${user.location.street.name}`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container>
                                <Grid item className={classes.labelContainer}>
                                    <Typography variant="caption">Postcode</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">{user.location.postcode}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>

        </Paper>
    )
}

export default UserDetails;