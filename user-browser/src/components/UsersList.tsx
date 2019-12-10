import React, { useState, useContext } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { IUser } from '.././pages/HomePage';
import { AppContext } from '../App';

const UsersList: React.FC<{ users: Array<IUser>, onChange: (value: IUser) => any }> = ({ users, onChange }) => {
    const [selectedUser, setSelectedUser] = useState({});
    const { searchbarValue, filterOptions } = useContext(AppContext);

    let { gender, ageRange, countries } = filterOptions;
    let countryNames: string[] = countries.map((value: any) => value.name.toLowerCase());

    // Filter users by the current searchbar value and filter options and then create a list item for each of them
    let items = users
        .filter((user) => {
            let age = Number.parseInt(user.dob.age);

            // If a user doesn't meet any of the filter requirements return false
            if (!`${user.name.title} ${user.name.first} ${user.name.last}`.toLowerCase().includes(searchbarValue.toLowerCase()) ||
                (gender !== "all" && user.gender !== filterOptions.gender) ||
                age < ageRange[0] || age > ageRange[1] ||
                (countryNames.length !== 0 && !countryNames.includes(user.location.country.toLowerCase()))) {
                return false
            }
            return true;
        })
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
                        <Avatar alt={`${user.name.title} ${user.name.first} ${user.name.last}`} src={user.picture.thumbnail} />
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