import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NoMatchPage } from './pages/NoMatchPage';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route component={NoMatchPage} />
    </Switch>
  );
}

export default App;
