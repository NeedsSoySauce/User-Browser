import React from 'react';
import { Paper, Typography, Divider, Grid, withWidth, useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import { IUser } from '.././pages/HomePage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rowContainer: {
            paddingLeft: theme.spacing(1),
            flexWrap: "nowrap",
            wordBreak: "break-word"
        },
        labelContainer: {
            minWidth: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        valueContainer: {
            flexGrow: 1
        },
        divider: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    }),
);

interface IDetailRow {
    label: string,
    value: string,
    labelVariant?: "inherit" | "button" | "overline" | "caption" | "body2" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "srOnly" | undefined,
    valueVariant?: "inherit" | "button" | "overline" | "caption" | "body2" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "srOnly" | undefined
}

const DetailRow: React.FC<IDetailRow> = ({ label, value, labelVariant, valueVariant }) => {
    const classes = useStyles();
    return (
        <Grid item>
            <Grid container className={classes.rowContainer}>
                <Grid item className={classes.labelContainer}>
                    <Typography variant={labelVariant}>{label}</Typography>
                </Grid>
                <Grid item className={classes.valueContainer}>
                    <Typography variant={valueVariant}>{value}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

DetailRow.defaultProps = {
    labelVariant: "caption",
    valueVariant: "body2"
}

const UserDetails: React.FC<{ user: IUser, width: string }> = ({ user, width }) => {
    const classes = useStyles();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    let userImage = (
        <Grid item>
            <Grid container justify="center">
                <img alt={`${user.name.title} ${user.name.first} ${user.name.last}`} src={user.picture.large} style={{ borderRadius: "3px" }} />
            </Grid>
        </Grid>
    )

    return (
        <Paper>
            <Grid container spacing={1} justify="space-between" direction={smDown ? "column" : "row"}>

                {!smDown ? null : userImage}

                <Grid item>

                    <Grid container direction="column" spacing={1}>

                        <DetailRow 
                            label="Name" 
                            value={`${user.name.title} ${user.name.first} ${user.name.last}`} 
                            valueVariant="h6"
                        />

                        <DetailRow 
                            label="Gender" 
                            value={user.gender === "male" ? "Male" : "Female"}
                        />

                        <DetailRow 
                            label="Date of Birth" 
                            value={user.dob.date}
                        />

                        <DetailRow 
                            label="Age" 
                            value={user.dob.age}
                        />

                        <DetailRow 
                            label="Nationality" 
                            value={user.nat}
                        />

                    </Grid>

                </Grid>

                {smDown ? null : userImage}

            </Grid>

            <Divider light className={classes.divider} />

            <Grid container spacing={1} justify="space-between">
                <Grid item>

                    <Grid container direction="column" spacing={1}>

                        <DetailRow 
                            label="Phone" 
                            value={user.phone}
                        />

                        <DetailRow 
                            label="Cell" 
                            value={user.cell}
                        />

                        <DetailRow 
                            label="Email" 
                            value={user.email}
                        />

                        <DetailRow 
                            label="Username" 
                            value={user.login.username}
                        />

                    </Grid>

                </Grid>
            </Grid>

            <Divider light className={classes.divider} />

            <Grid container spacing={1} justify="space-between">
                <Grid item>

                    <Grid container direction="column" spacing={1}>

                        <DetailRow 
                            label="Country" 
                            value={user.location.country}
                        />

                        <DetailRow 
                            label="City" 
                            value={user.location.city}
                        />

                        <DetailRow 
                            label="State" 
                            value={user.location.state}
                        />

                        <DetailRow 
                            label="Street Address" 
                            value={`${user.location.street.number} ${user.location.street.name}`}
                        />

                        <DetailRow 
                            label="Postcode" 
                            value={`${user.location.postcode}`}
                        />

                    </Grid>

                </Grid>
            </Grid>

        </Paper>
    )
}

export default withWidth()(UserDetails);