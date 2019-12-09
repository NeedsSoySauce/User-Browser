import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoMatchPage from './pages/NoMatchPage';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';

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

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Container>
                    <Toolbar variant="dense">
                        <Typography variant="h6">
                            <Link to="/" style={{ textDecoration: "inherit", color: "inherit"}}>
                                User Browser
                            </Link>
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route component={NoMatchPage} />
            </Switch>
        </ThemeProvider>
    );
}

export default App;
