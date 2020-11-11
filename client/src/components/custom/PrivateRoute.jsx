import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthorizate, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthorizate ? <Component {...props} user={user} /> : <Redirect to="/login" />
    }
  />
);
export default PrivateRoute;
