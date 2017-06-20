import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppView from 'views/App';
import EmailConfirmed from 'views/EmailConfirmed';
import FourOhFour from 'views/FourOhFour';
import Home from 'views/Home';
import Login from 'views/Login';

import Header from 'components/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact component={Home} path="/" />
          <Route component={AppView} path="/app" />
          <Route component={EmailConfirmed} path="/email-confirmed" />
          <Route component={Login} path="/login" />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
