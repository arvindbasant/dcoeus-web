import React from 'react';
import { Navigation } from 'components/Navigation';
import { Switch, Route } from 'react-router';
import { History } from 'history';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ConnectedRouter } from 'connected-react-router';
import Dashboard from 'components/Dashboard';
import { ApplicationState } from 'store/types';

import './App.scss';

type AppType = {
  store: Store<ApplicationState>;
  history: History;
};

const App = ({ store, history }: AppType) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="app">
          <Navigation />
          <Switch>
            <Route path="/" exact={true} component={Dashboard} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;