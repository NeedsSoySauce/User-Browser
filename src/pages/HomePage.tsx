import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline, Container, Grid, Paper, Typography, withWidth, CircularProgress } from '@material-ui/core';
import UserDetails from ".././components/UserDetails";
import UsersList from ".././components/UsersList";
import localforage from 'localforage';

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
    console.log("storing")
    // Store each user under a key by their uuid
    users.forEach(user => {
        localUserStore.setItem(user.login.uuid, user);
    })
}

async function loadUsers(amount: number) {
    let users: IUser[] = [];
    await localUserStore.iterate((value: IUser, key: string, iterationNumber: number) => {
        users.push(value);
        // Stop iteration once we've got enough users
        if (iterationNumber > amount) {
            return null;
        }
    })
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

    }),
);

// Setup indexedDB
const localUserStore = localforage.createInstance({
    name: "user-browser-users"
})

const HomePage: React.FC<{ width: string }> = ({ width }) => {
    const classes = useStyles();
    const [pageNumber, setPageNumber] = useState(1);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState({});

    // Fetch users and trigger a state update when complete, also triggers when the pageNumber is changed
    useEffect(() => {
        const abortController = new AbortController()

        fetch(`https://randomuser.me/api/?page=${pageNumber}&results=25&seed=abc123`, { signal: abortController.signal })
            .then(res => res.json())
            .then(data => {
                setUsers(data.results);
                storeUsers(data.results)
            })
            .catch((error) => {
                if (error.code !== 20) { // AbortError "The user aborted a request."
                    console.log('Error', { code: error.code, message: error.message, name: error.name })
                }

                // Fallback to using local database
                loadUsers(25).then(setUsers)
            })

        return () => abortController.abort()
    }, [pageNumber])

    let content = null
    if (users.length === 0) {
        content = (
            <Grid container justify="center" alignItems="center" direction="column" spacing={2} style={{ height: "50vh" }}>
                <Grid item>
                    <CircularProgress />
                </Grid>
                <Grid item>
                    <Typography variant="caption">
                        Fetching data...
                    </Typography>
                </Grid>
            </Grid>
        )
    } else {
        let selectedUserDetails = isEmpty(selectedUser) ? null : <UserDetails user={selectedUser as IUser} />;
        content = (
            <Grid container spacing={2} direction={width === "xs" ? "column" : "row"}>
                <Grid item md={3} sm={4}>
                    <Paper className={classes.listContainer}>
                        <UsersList users={users} onChange={setSelectedUser} />
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