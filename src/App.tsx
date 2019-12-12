import { AppBar, Container, IconButton, Toolbar, Typography, withWidth } from '@material-ui/core';
import { createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import CustomDialogGrup from './components/CustomDialogGroup';
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

const lightTheme = createMuiTheme({
    palette: {
      background: {
        default: "#FAFAFA"
      }
    },
    overrides: {
        MuiPaper: {
            root: {
                padding: '10px',
                marginBottom: '10px',
            },
        },
    },
});

const darkTheme = createMuiTheme({
    palette: {
        type: "dark"
      },
      overrides: {
          MuiPaper: {
              root: {
                  padding: '10px',
                  marginBottom: '10px',
              },
          },
      },
})

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
        rightContainer: {
            display: "flex",
            alignItems: "center",
            [theme.breakpoints.down('xs')]: {
                flexGrow: 1
            },
        }
    })
);

const App: React.FC<IAppProps> = ({ width }) => {
    const themeType = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(themeType === "light" ? lightTheme : darkTheme);
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

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme)
        localStorage.setItem("theme", theme === lightTheme ? "dark" : "light");
    }

    let searchbarRef = React.createRef<any>();
    let menuButtonRef = React.createRef<any>();

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

                            <div className={classes.rightContainer}>
                                <Searchbar onInput={setSearchbarValue} ref={searchbarRef}/>
                                <CustomDialogGrup>
                                    <FilterDialog onChange={(value: any) => setFilterOptions(value)} />
                                    <SortDialog onChange={(value: any) => setSortingOptions(value)} />
                                </CustomDialogGrup>
                                <IconButton
                                    color="inherit"
                                    size={width === "xs" ? "small" : "medium"}
                                    onClick={toggleTheme}
                                >
                                    {theme === lightTheme ? <Brightness4Icon /> : <Brightness7Icon />}
                                </IconButton>
                            </div>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Switch>
                    <Route 
                        path="/" 
                        render={() => <HomePage drawerControlRefs={[menuButtonRef, searchbarRef]} />}
                    />
                    <Route component={NoMatchPage} />
                </Switch>
            </AppContext.Provider>
        </ThemeProvider>
    );
}

export default withWidth()(App);
