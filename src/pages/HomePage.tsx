import { Button, CircularProgress, Container, CssBaseline, Grid, Paper, SwipeableDrawer, Typography, withWidth } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { debounce } from "debounce";
import localforage from 'localforage';
import React, { useEffect, useRef, useState } from 'react';
import UserDetails from ".././components/UserDetails";
import UsersList from ".././components/UsersList";

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
        },
        drawerRoot: {
            width: "66vw"
        },
        toolbar: theme.mixins.toolbar,
        userDetailsContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down('xs')]: {
                height: "50vh",
            },
        }
    }),
);

// Setup indexedDB
const localUserStore = localforage.createInstance({
    name: "user-browser-users"
})

const HomePage: React.FC<{ width: string, drawerControlRef?: React.RefObject<any> }> = ({ width, drawerControlRef }) => {
    const classes = useStyles();
    const [results, setResults] = useState(25);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerScrollTop, setDrawerScrollTop] = useState(0);

    if (drawerControlRef !== undefined && drawerControlRef.current !== null) {
        drawerControlRef.current.onclick = () => {
            setDrawerOpen(!drawerOpen);
            drawer.current = document.querySelector(".MuiDrawer-paper");

            // If no users were able to be loaded then the drawer won't exist as it has nothing to display
            if (drawer.current) {
                drawer.current.scrollTo(0, drawerScrollTop);
            }
        }
    }

    // Load more results when the user scrolls to the bottom of the UserList container
    const handleScroll = (e: React.SyntheticEvent) => {
        let target = (width === "xs" ? drawer.current : document.getElementById("#listContainer")) as HTMLDivElement;

        // It's possible for this method to be called before the drawer has been mounted
        // This can occer if a user changes screen widths before a debounced function call is made
        if (target === null) {
            return;
        }
        let scrollTop = target.scrollTop + Number.parseFloat(getComputedStyle(target).height || "0");
        let scrollPercent = scrollTop / target.scrollHeight;

        // Store the scroll position after the user has finished scrolling so we can restore it when
        // the drawer is opened again
        setDrawerScrollTop(target.scrollTop);

        if (scrollPercent > 0.9) {
            setResults(results + 25);
        }
    }

    const drawer = useRef<any>();
    let userList = (
        <UsersList
            users={users}
            initialSelection={isEmpty(selectedUser) ? undefined : selectedUser as IUser}
            onSelection={setSelectedUser}
            onSearch={() => {
                setResults(25);
                if (drawer.current !== undefined) {
                    drawer.current.scrollTo(0, 0)
                }
            }}
            results={results}
        />
    )

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

                switch (error.code) {
                    case 20:
                        // AbortError "The user aborted a request."
                        break;
                    case 503:
                        // Too many requests (API has blocked us for a few minutes)
                        break;
                    default:
                        // console.log(error);
                }

                // Fallback to using local database
                loadUsers().then(users => {
                    setUsers(users);
                    setUsersLoaded(true);
                })
            })
        return () => abortController.abort()
    }, [usersLoaded])

    // Display a progress indicator if users are still loading, otherwise display the users as a list
    let content = null
    if (!usersLoaded || (usersLoaded && users.length === 0)) {
        content = (
            <Grid container justify="center" alignItems="center" direction="column" spacing={2} className={classes.loadingContainer}>
                <Grid item>
                    {!usersLoaded ? <CircularProgress /> : <ErrorIcon className={classes.errorIcon} />}
                </Grid>
                <Grid item>
                    <Typography variant="caption">
                        {!usersLoaded ? "Fetching data..." : "Failed to fetch data and no users are available in your local database."}
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
            <React.Fragment>

                {width !== "xs" ? null :
                    <SwipeableDrawer
                        open={drawerOpen}
                        onClose={() => {
                            setDrawerOpen(false);
                        }}
                        onOpen={() => {
                            setDrawerOpen(true);
                            drawer.current = document.querySelector(".MuiDrawer-paper");
                            drawer.current.scrollTo(0, drawerScrollTop);
                        }}
                        onScroll={debounce(handleScroll, 50)}
                        classes={{
                            paper: classes.drawerRoot
                        }}
                        ModalProps={{ disableEnforceFocus: true }}
                        swipeAreaWidth={60}
                    >
                        <div className={classes.toolbar}></div>
                        {userList}
                    </SwipeableDrawer>
                }

                <Grid container spacing={2} direction={width === "xs" ? "column" : "row"}>

                    {width === "xs" ? null :
                        <Grid item md={3} sm={5}>
                            <Paper id="#listContainer" className={classes.listContainer} onScroll={debounce(handleScroll, 66)}>
                                {userList}
                            </Paper>
                        </Grid>
                    }

                    <Grid
                        item
                        xs={width !== "xs"}
                        className={selectedUserDetails !== null ? undefined : classes.userDetailsContainer}
                    >
                        {selectedUserDetails !== null ? selectedUserDetails : (
                            <Typography variant="caption" >
                                Select a user to view detailed information
                            </Typography>
                        )}
                    </Grid>

                </Grid>
            </React.Fragment>
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