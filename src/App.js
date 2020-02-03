import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import routes from './router/index';
import { withFirebase } from './components/Firebase';
import { withAuthentication } from './components/Session';

import AppHeader from './components/AppHeader.jsx';
import AppFooter from './components/AppFooter.jsx';

import './assets/kanbasu/main.scss'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <AppHeader />
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={props => (
                  <route.component {...props} routes={route.routes} />
                )}
              />
            ))}
          </Switch>
          <AppFooter />
        </Router>
      </div>
    );
  }
}

export default withAuthentication(withFirebase(App));
