import { InputBase } from '@material-ui/core';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';

// Several of these styles are borrowed from https://material-ui.com/components/app-bar/#PrimarySearchAppBar.js
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        inputRoot: {
            color: 'inherit'
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        }
    })
);

const Searchbar: React.FC<{ [x: string]: any }> = React.forwardRef<any, any>( ({ onInput }, ref) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                inputRef={ref}
                value={inputValue}
                onInput={e => {
                    let value = (e.target as HTMLInputElement).value;
                    setInputValue(value);
                    if (onInput !== undefined) {
                        onInput(value);
                    }
                }}
            />
        </div>
    );
})

export default Searchbar;