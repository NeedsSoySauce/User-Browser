import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoMatchPage from './pages/NoMatchPage';
import { ThemeProvider, createMuiTheme, makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container, Button } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import Searchbar from './components/Searchbar';
import FilterDialog from './components/FilterDialog';

interface IFilterOptions {
    filterOptions: {
        gender: string,
        ageRange: number[],
        countries: object[]
    }
}

interface IAppContext extends IFilterOptions {
    searchbarValue: string
}

export const AppContext = React.createContext<IAppContext>({
    searchbarValue: '',
    filterOptions: {
        gender: 'all',
        ageRange: [0, 100],
        countries: []
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
        toolbarRoot: {
            justifyContent: "space-between"
        },
        searchInputs: {
            display: "flex",
        }
    })
);

const App: React.FC = () => {
    const [searchbarValue, setSearchbarValue] = useState("");
    const [filterOptions, setFilterOptions] = useState({
        gender: 'all',
        ageRange: [0, 100],
        countries: []
    });
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{ searchbarValue: searchbarValue, filterOptions: filterOptions }}>
                <AppBar position="static" style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Container>
                        <Toolbar variant="dense" classes={{ root: classes.toolbarRoot }}>
                            <Typography variant="h6" noWrap>
                                <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
                                    User Browser
                                </Link>
                            </Typography>
                            <div className={classes.searchInputs}>
                                <Searchbar onInput={setSearchbarValue} />
                                <FilterDialog onChange={(value: any) => { setFilterOptions(value) }} />
                                <Button
                                    color="inherit"
                                    startIcon={<SortIcon />}
                                >
                                    Sort
                                </Button>
                            </div>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route component={NoMatchPage} />
                </Switch>
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default App;
