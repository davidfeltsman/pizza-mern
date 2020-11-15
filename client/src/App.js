import React, { useEffect, useLayoutEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { checkUserLogin, removeNotification } from './redux/actions/actionCreators';

import Login from './components/auth/Login';
import PrivateRoute from './components/custom/PrivateRoute';
import AuthRoute from './components/custom/AuthRoute';
import Dashboard from './pages/Dashboard';
import Register from './components/auth/Register';
import Notification from './components/notification/Notification';
import NotFound from './pages/NotFound';

function App() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkUserLogin());
    }
  }, [dispatch]);
  const { enqueueSnackbar } = useSnackbar();
  const { user, isAuthorizate, notifications } = useSelector(
    ({ currentUser: { user, isAuthorizate }, notificationAPI: { notifications } }) => ({
      user,
      isAuthorizate,
      notifications,
    }),
  );

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((item) => {
        if (item.message) {
          return enqueueSnackbar(item.message, {
            autoHideDuration: 2000,
            maxsnack: 10,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            preventDuplicate: true,
            onExited: () => dispatch(removeNotification(item.id)),
            content: (key, message) => (
              <Notification id={key} message={message} status={item.status} />
            ),
          });
        } else {
          return null;
        }
      });
    }
  }, [notifications, dispatch, enqueueSnackbar]);

  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/dashboard/users" />
        <PrivateRoute
          path="/dashboard"
          isAuthorizate={isAuthorizate}
          component={Dashboard}
          user={user}
        />
        <AuthRoute exact path="/login" component={Login} isAuthorizate={isAuthorizate} />
        <AuthRoute exact path="/register" component={Register} isAuthorizate={isAuthorizate} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
