import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthorizate, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthorizate ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);
export default PrivateRoute;
