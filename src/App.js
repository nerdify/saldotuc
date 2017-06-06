import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from 'views/Home';

import Header from 'components/Header';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <Route exact component={Home} path="/" />
        </div>
      </Router>
    );
  }
}

export default App;
