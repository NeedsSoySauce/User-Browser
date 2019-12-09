import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline, Container, Grid, Typography, withWidth, CircularProgress } from '@material-ui/core';
import UserDetails from ".././components/UserDetails";
import UsersList from ".././components/UsersList";

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
                maxHeight: "50vh",
            },
            [theme.breakpoints.up('sm')]: {
                maxHeight: "75vh",
            },
            overflowY: "auto",
            overflowX: "hidden"
        },

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

const HomePage: React.FC<{ width: string }> = ({ width }) => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    // Fetch users and trigger a state upstate when complete
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

    let content = null
    if (users.length === 0) {
        content = (
            <Grid container justify="center" alignItems="center" direction="column" spacing={2} style={{height: "50vh"}}>
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
                    <UsersList users={users} onChange={setSelectedUser}/>
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