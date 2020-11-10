import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, isAuthorizate, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (!isAuthorizate ? <Component {...props} /> : <Redirect to="/" />)}
  />
);
export default AuthRoute;
