import { AppBar, Container, IconButton, Toolbar, Typography, withWidth } from '@material-ui/core';
import { createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import FilterDialog from './components/FilterDialog';
import Searchbar from './components/Searchbar';
import SortDialog from './components/SortDialog';
import HomePage from './pages/HomePage';
import NoMatchPage from './pages/NoMatchPage';

interface IAppProps {
    width: string
}

interface IAppContext {
    searchbarValue: string,
    filterOptions: {
        gender: string,
        ageRange: number[],
        countries: object[]
    },
    sortingOptions: {
        ordering: string,
        direction: string
    }
}

export const AppContext = React.createContext<IAppContext>({
    searchbarValue: '',
    filterOptions: {
        gender: 'all',
        ageRange: [0, 100],
        countries: []
    },
    sortingOptions: {
        ordering: "First name",
        direction: "Descending"
    }

});

const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                padding: '10px',
                marginBottom: '10px',
            },
        },
    },
});

// Several of these styles are borrowed from https://material-ui.com/components/app-bar/#PrimarySearchAppBar.js
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down('xs')]: {
                padding: 0
            },
        },
        appBar: {
            paddingTop: 0, 
            paddingBottom: 0,
            zIndex: theme.zIndex.drawer + 1000
        },
        toolbarRoot: {
            justifyContent: "space-between",
            [theme.breakpoints.down('xs')]: {
                padding: 0
            },
        },
        searchInputs: {
            display: "flex",
            alignItems: "center",
            [theme.breakpoints.down('xs')]: {
                flexGrow: 1
            },
        }
    })
);

const App: React.FC<IAppProps> = ({ width }) => {
    const [searchbarValue, setSearchbarValue] = useState("");
    const [filterOptions, setFilterOptions] = useState({
        gender: 'all',
        ageRange: [0, 100],
        countries: []
    });
    const [sortingOptions, setSortingOptions] = useState({
        ordering: "First name",
        direction: "Descending"
    })
    const classes = useStyles();

    let menuButtonRef = React.createRef();

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{ searchbarValue, filterOptions, sortingOptions }}>
                <AppBar position="relative" className={classes.appBar}>
                    <Container className={classes.container}>
                        <Toolbar variant="dense" classes={{ root: classes.toolbarRoot }}>

                            {width === 'xs' ?
                                <IconButton buttonRef={menuButtonRef} edge="start" color="inherit" aria-label="menu">
                                    <MenuIcon />
                                </IconButton>
                            :
                                <Typography variant="h6" noWrap>
                                    <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
                                        User Browser
                                    </Link>
                                </Typography>
                            }

                            <div className={classes.searchInputs}>
                                <Searchbar onInput={setSearchbarValue} />
                                <FilterDialog onChange={(value: any) => setFilterOptions(value)} />
                                <SortDialog onChange={(value: any) => setSortingOptions(value)} />
                            </div>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Switch>
                    <Route 
                        path="/" 
                        render={() => <HomePage drawerControlRef={menuButtonRef} />}
                    />
                    <Route component={NoMatchPage} />
                </Switch>
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default withWidth()(App);
