import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NoMatchPage from './pages/NoMatchPage';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NoMatchPage} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
