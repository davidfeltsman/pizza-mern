import {
  SET_CURRENT_USER,
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
  BASE_URL,
  REMOVE_CURRENT_USER,
  CLEAR_NOTIFICATIONS,
} from '../constants';
import { axios } from '../../API/API';
import notificationNormalize from '../../API/notificationNormalize';

//USER
export const userPostFetch = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}auth/login`, user);
    localStorage.setItem('token', res.data.token);
    dispatch(setCurrentUser(res.data.user));
  } catch (err) {
    dispatch(setNotification(notificationNormalize(err)));
  }
};

export const checkUserLogin = () => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}auth/check`);
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
