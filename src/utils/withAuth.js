import hoistStatics from 'hoist-non-react-statics';
import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from "./AuthService";

function withAuth(Component) {
  const auth = new AuthService();

  function C(props) {
    if (!auth.loggedIn()) {
      return <Redirect to="/login" />
    }

    return <Component {...props} auth={auth} />
  }

  C.displayName = `withAuth(${Component.displayName || Component.name})`;

  return hoistStatics(C, Component);
}

export default withAuth;
