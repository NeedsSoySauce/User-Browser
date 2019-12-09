import React, { useState, useContext } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { IUser } from '.././pages/HomePage';
import { AppContext } from '../App';

const UsersList: React.FC<{ users: Array<IUser>, onChange: (value: IUser) => any }> = ({ users, onChange }) => {
    const [selectedUser, setSelectedUser] = useState({});
    const { searchbarValue } = useContext(AppContext);

    // Display only users that include the current searchbar value
    if (searchbarValue !== "") {
        console.log(searchbarValue)
    }

    let items = users
        .filter((user) => `${user.name.title} ${user.name.first} ${user.name.last}`.toLowerCase().includes(searchbarValue.toLowerCase()))
        .map((user) => {
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
        <List style={{ padding: 0 }}>
            {items}
        </List>
    );
}

export default UsersList;