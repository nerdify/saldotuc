import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'views/Home';
import FourOhFour from 'views/FourOhFour';

import Header from 'components/Header';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route exact component={Home} path="/" />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
