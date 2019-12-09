import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline, Container, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(1)
    },
    paper: {
        maxHeight: '95vh',
        overflowY: "scroll",
        overflowX: "hidden"
    }
  }),
);

export const HomePage: React.FC = () => {
    const classes = useStyles();

    return (
        <CssBaseline>
            <Container maxWidth="xl" className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <Paper>
                                    <Typography variant="h6">
                                            User Browser
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper className={classes.paper} style={{padding: 0}}>
                                    <List style={{padding: 0}}>
                                        <ListItem
                                            button
                                            selected={true}
                                        >
                                            <ListItemText primary="ListItem" />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                        <Typography variant="body1">
                                Details
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </CssBaseline>
    );
}