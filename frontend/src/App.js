// @flow
import React from 'react';
import { createBrowserHistory } from 'history';
import { Provider } from "mobx-react"
import { Router, Route, Switch } from "react-router-dom";

import { Home } from 'pages';
import { stores } from './stores'

const history = createBrowserHistory()

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider {...stores}>
          <Router history={history}>
            <Switch>
              <Route exact path='/' component={Home} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;