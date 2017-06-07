import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FourOhFour from 'views/FourOhFour';
import Home from 'views/Home';

import Header from 'components/Header';

function App() {
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

export default App;
