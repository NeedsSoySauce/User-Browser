import React, { useState, useContext } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { IUser } from '.././pages/HomePage';
import { AppContext } from '../App';

interface IUsersListProps {
    users: Array<IUser>, 
    onChange?: (value: IUser) => any, 
    results: number
}

// Page numbers start from 1
const UsersList: React.FC<IUsersListProps> = ({ users, onChange, results }) => {
    const [selectedUser, setSelectedUser] = useState({});
    const { searchbarValue, filterOptions, sortingOptions } = useContext(AppContext);

    let { gender, ageRange, countries } = filterOptions;
    let countryNames: string[] = countries.map((value: any) => value.name.toLowerCase());

    // Filter users by the current searchbar value and filter options and then create a list item for each of them
    let matchingUsers = users
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

    // Sort matching users based on the selected ordering and direction
    let predicate = (a: IUser, b: IUser) => a.name.first.localeCompare(b.name.first);
    switch (sortingOptions.ordering) {
        case "Last name":
            predicate = (a, b) => a.name.last.localeCompare(b.name.last);
            break;
        case "Age":
            predicate = (a, b) => Number.parseInt(a.dob.age) - Number.parseInt(b.dob.age);
            break;
        case "Country":
            predicate = (a, b) => a.location.country.localeCompare(b.location.country);
            break;
    }

    matchingUsers.sort(predicate)

    if (sortingOptions.direction === "Ascending") {
        matchingUsers.reverse();
    }

    // Create list items for the matching users
    let items = [];
    for (let i = 0; i < results; i++) {

        if (matchingUsers[i] === undefined) {
            break;
        }

        let user = matchingUsers[i];
        items.push(
            <ListItem
                key={user.login.uuid}
                button
                selected={selectedUser === user}
                onClick={e => {
                    setSelectedUser(user);
                    if (onChange) {
                        onChange(user);
                    }
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
    }

    return (
        <List style={{ padding: 0 }}>
            {items}
        </List>
    );
}

export default UsersList;