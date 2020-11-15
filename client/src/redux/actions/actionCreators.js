import {
  SET_CURRENT_USER,
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
  REMOVE_CURRENT_USER,
  CLEAR_NOTIFICATIONS,
} from '../constants';
import { api } from '../../API/API';

//USER
export const userPostFetch = (user) => async (dispatch) => {
  const res = await api.postData('auth/login', user);
  localStorage.setItem('token', res.data.token);
  dispatch(setCurrentUser(res.data.user));
};

export const checkUserLogin = () => async (dispatch) => {
  try {
    const res = await api.postData('auth/check');
    dispatch(setCurrentUser(res.data.user));
  } catch (err) {
    localStorage.removeItem('token');
    dispatch(removeCurrentUser());
  }
};

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER,
});

//NOTIFICATION
export const setNotification = (data) => ({
  type: SET_NOTIFICATION,
  data,
});

export const removeNotification = (id) => ({
  type: REMOVE_NOTIFICATION,
  id,
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
});
