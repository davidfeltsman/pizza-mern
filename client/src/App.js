import React, { useEffect, useLayoutEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { checkUserLogin, removeNotification } from './redux/actions/actionCreators';

import Login from './components/auth/Login';
import PrivateRoute from './components/custom/PrivateRoute';
import AuthRoute from './components/custom/AuthRoute';
import Dashboard from './pages/Dashboard';
import Register from './components/auth/Register';
import Header from './components/header/Header';
import Notification from './components/notification/Notification';

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const { user, isAuthorizate, notifications } = useSelector(
    ({ currentUser: { user, isAuthorizate }, notificationAPI: { notifications } }) => ({
      user,
      isAuthorizate,
      notifications,
    }),
  );
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkUserLogin(token));
    }
  }, [dispatch]);
  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((item) =>
        enqueueSnackbar(item.message, {
          autoHideDuration: 3000,
          maxSnack: 10,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          preventDuplicate: true,
          onClose: () => dispatch(removeNotification(item.id)),
          content: (key, message) => (
            <Notification id={key} message={message} status={item.status} />
          ),
        }),
      );
    }
  }, [notifications, dispatch, enqueueSnackbar]);
  // Кабинет пользователя
  // Роль
  return (
    <div className="App">
      {isAuthorizate && <Header />}
      <Switch>
        <AuthRoute exact path="/login" component={Login} isAuthorizate={isAuthorizate} />
        <AuthRoute exact path="/register" component={Register} isAuthorizate={isAuthorizate} />
        <PrivateRoute exact path="/" isAuthorizate={isAuthorizate} component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
