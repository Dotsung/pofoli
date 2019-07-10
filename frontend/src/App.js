// @flow
import React from 'react';
import { createBrowserHistory } from 'history';
import { Provider } from "mobx-react"
import { Router, Route, Switch } from "react-router-dom";

import { Home, Auth, User, Test } from 'pages';
import { stores } from './stores'

const history = createBrowserHistory()

const App = () => (
    <div className="App">
      <Provider {...stores}>
        <Router history={history}>
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/user/:username' component={User} />
            <Route path='/test' component={Test} />
            <Route path='/' component={Home} />
          </Switch>
        </Router>
      </Provider>
    </div>
);

export default App;