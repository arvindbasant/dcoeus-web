import React from 'react';
import { Navigation } from 'components/Navigation';
import { Switch, Route } from 'react-router';
import Dashboard from 'components/Dashboard';
import Explore from 'components/Explore';
import { StoreProvider } from 'context';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <div className="app">
        <div className="app__navigation-container">
          <Navigation />
        </div>
        <div className="app__routes-container">
          <Switch>
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/explore" exact={true} component={Explore} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </StoreProvider>
);

export default App;