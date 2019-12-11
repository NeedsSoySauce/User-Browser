import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline, Container, Grid, Paper, Typography, withWidth, CircularProgress, Button } from '@material-ui/core';
import UserDetails from ".././components/UserDetails";
import UsersList from ".././components/UsersList";
import localforage from 'localforage';
import ErrorIcon from '@material-ui/icons/Error';

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

async function storeUsers(users: IUser[]) {
    // Store each user using their uuid as the key (this helps to prevent us from storing duplicates of the same user)
    users.forEach(user => {
        localUserStore.setItem(user.login.uuid, user);
    })
}

async function loadUsers() {
    let users: IUser[] = [];
    // **Note: The curly braces in the body of the arrow function below are required 
    // otherwise this function will fail when loading an indexedDB of 5000+ users
    // (for a reason I am yet to figure out!)
    await localUserStore.iterate((user: IUser) => { users.push(user) });
    return users;
}

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
        loadingContainer: {
            height: "50vh", 
            textAlign: "center"
        },
        listContainer: {
            padding: 0,
            [theme.breakpoints.down('xs')]: {
                height: "50vh",
            },
            [theme.breakpoints.up('sm')]: {
                height: "75vh",
            },
            overflowY: "auto",
            overflowX: "hidden"
        },
        errorIcon: {
            height: "40px",
            width: "40px"
        }
    }),
);

// Setup indexedDB
const localUserStore = localforage.createInstance({
    name: "user-browser-users"
})

const HomePage: React.FC<{ width: string }> = ({ width }) => {
    const classes = useStyles();
    const [pageNumber, setPageNumber] = useState(1);
    const [results, setResults] = useState(25);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [usersLoaded, setUsersLoaded] = useState(false);

    // Fetch users and trigger a state update when complete, also triggers when the pageNumber is changed
    // This function will prefer using fresh data returned from randomuser.me, but if it's unable to do this (e.g. if we're offline)
    // it will fallback to using the indexedDB of users
    useEffect(() => {
        const abortController = new AbortController()

        fetch(`https://randomuser.me/api/?page=1&results=5000&seed=abc123&exc=id,registered`, { signal: abortController.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error(`${res.status} - ${res.statusText}`);
                }
                return res.json()
            })
            .then(data => {
                storeUsers(data.results);
                setUsers(data.results);
                setUsersLoaded(true);
            })
            .catch((error) => {
                if (error.code !== 20) { // AbortError "The user aborted a request."
                    console.log(error)
                }

                // Fallback to using local database
                loadUsers().then(users => {
                    setUsers(users);
                    setUsersLoaded(true);
                })
            })
        return () => abortController.abort()
    }, [pageNumber, results, usersLoaded])

    // Display a progress indicator if users are still loading, otherwise display the users as a list
    let content = null
    if (!usersLoaded || (usersLoaded && users.length === 0)) {
        content = (
            <Grid container justify="center" alignItems="center" direction="column" spacing={2} className={classes.loadingContainer}>
                <Grid item>
                    { !usersLoaded ? <CircularProgress /> : <ErrorIcon className={classes.errorIcon} />}
                </Grid>
                <Grid item>
                    <Typography variant="caption">
                        { !usersLoaded ? "Fetching data..." : "Failed to fetch data and no users are available in your local database."}
                    </Typography>
                </Grid>
                {!usersLoaded ? null : (
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setUsersLoaded(false);
                            }}
                        >
                            Fetch data
                        </Button>
                    </Grid>
                )}
            </Grid>
        )
    } else {
        let selectedUserDetails = isEmpty(selectedUser) ? null : <UserDetails user={selectedUser as IUser} />;
        content = (
            <Grid container spacing={2} direction={width === "xs" ? "column" : "row"}>
                <Grid item md={3} sm={4}>
                    <Paper className={classes.listContainer}>
                        <UsersList users={users} onChange={setSelectedUser} pageNumber={pageNumber} results={results} />
                    </Paper>
                </Grid>

                <Grid xs item style={selectedUserDetails === null ? { display: "flex", justifyContent: "center", alignItems: "center" } : {}}>
                    {selectedUserDetails !== null ? selectedUserDetails : (
                        <Typography variant="caption" >
                            Select a user to view detailed information
                        </Typography>
                    )}
                </Grid>
            </Grid>
        )
    }

    return (
        <CssBaseline>
            <Container className={classes.container} maxWidth={width === "xs" ? false : "lg"}>
                {content}
            </Container>
        </CssBaseline>
    );
}

export default withWidth()(HomePage);