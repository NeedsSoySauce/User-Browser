import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { IUser } from '.././pages/HomePage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

const UsersList: React.FC<{ users: Array<IUser>, onChange: (value: IUser) => any }> = ({ users, onChange }) => {
    const classes = useStyles();
    const [selectedUser, setSelectedUser] = useState({});

    let items = users.map((user) => {
        return (
            <ListItem
                key={user.login.uuid}
                button
                selected={selectedUser === user}
                onClick={e => {
                    setSelectedUser(user);
                    onChange(user);
                }}
            >
                <ListItemAvatar>
                    <Avatar alt={`${user.name.title} ${user.name.first} ${user.name.last}`} src={user.picture.thumbnail}></Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`${user.name.first} ${user.name.last}`}
                    secondary={`${user.dob.age}, ${user.gender === "male" ? "Male" : "Female"}, ${user.nat}`}
                />
            </ListItem>
        )
    })

    return (
        <Paper className={classes.listContainer}>
            <List style={{ padding: 0 }}>
                {items}
            </List>
        </Paper>
    );
}

export default UsersList;