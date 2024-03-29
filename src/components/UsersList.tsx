import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IUser } from '.././pages/HomePage';
import { AppContext } from '../App';

interface IUsersListProps {
    users: Array<IUser>, 
    onSelection?: (value: IUser) => any, 
    onSearch?: () => any, 
    results: number,
    initialSelection?: IUser
}

// Page numbers start from 1
const UsersList: React.FC<IUsersListProps> = ({ users, onSelection, onSearch, results, initialSelection }) => {
    const [selectedUser, setSelectedUser] = useState(initialSelection);
    const { searchbarValue, filterOptions, sortingOptions } = useContext(AppContext);
    const firstUpdate = useRef(true);

    useEffect(() => {

        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (onSearch) {
            onSearch();
        }
        // Disable warning about onSearch not being included in deps as we don't want this to trigger if onSearch changes
        // eslint-disable-next-line
    }, [searchbarValue, filterOptions, sortingOptions])

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
                    if (onSelection) {
                        onSelection(user);
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
        <List style={{ padding: 0 }} >
            {items}
        </List>
    );
}

export default UsersList;