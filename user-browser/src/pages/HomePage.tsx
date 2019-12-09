import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline, Container, Grid, Paper, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import UserDetails from ".././components/UserDetails";

function isEmpty(obj: object) {
    for (let key in obj) {
        return false;
    }
    return true;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(1)
        },
        paper: {
            maxHeight: '75vh',
            overflowY: "auto",
            overflowX: "hidden"
        }
    }),
);

export interface IUser {
    cell: string,
    gender: string,
    dob: {
        date: string,
        age: string
    },
    email: string,
    location: {
        city: string,
        coordinates: {
            latitude: string,
            longitude: string,
        },
        country: string,
        postcode: number,
        state: string,
        street: {
            number: number,
            name: string
        },
        timezone: {
            description: string,
            offset: string
        }
    },
    login: {
        md5: string,
        password: string,
        salt: string,
        sha1: string,
        sha256: string,
        username: string,
        uuid: string
    },
    name: {
        title: string,
        first: string,
        last: string
    },
    nat: string,
    phone: string,
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    },
    registered: {
        age: number,
        date: string
    };
}

const HomePage: React.FC = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    const createUsersList = (users: Array<IUser>) => {
        let items = users.map((user) => {
            return (
                <ListItem
                    key={user.login.uuid}
                    button
                    selected={selectedUser === user}
                    onClick={e => setSelectedUser(user)}
                >
                    <ListItemAvatar>
                        <Avatar src={user.picture.thumbnail}></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${user.name.first} ${user.name.last}`} />
                </ListItem>
            )
        })
        return (
            <List style={{ padding: 0 }}>
                {items}
            </List>
        )
    }

    useEffect(() => {
        const abortController = new AbortController()

        fetch("https://randomuser.me/api/?results=25", { signal: abortController.signal })
            .then(res => res.json())
            .then(data => {
                console.log(data.results);
                setUsers(data.results);
            })
            .catch(error => {
                if (error.code !== 20) { // AbortError "The user aborted a request."
                    console.log('Error', { code: error.code, message: error.message, name: error.name })
                }
            })

        return () => abortController.abort()
    }, [])

    let usersList = users.length === 0 ? null : createUsersList(users);
    let selectedUserDetails = isEmpty(selectedUser) ? null : <UserDetails user={selectedUser as IUser}/>;

    return (
        <CssBaseline>
            <Container maxWidth="xl" className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <Paper>
                                    <Typography variant="h5">
                                        User Browser
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper className={classes.paper} style={{ padding: 0 }}>
                                    {usersList}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs style={selectedUserDetails === null ? {display: "flex", justifyContent: "center", alignItems: "center"} : {}}>
                        {selectedUserDetails !== null ? selectedUserDetails : (
                            <Typography variant="caption" >
                                Select a user to view detailed information on them
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </CssBaseline>
    );
}

export default HomePage;