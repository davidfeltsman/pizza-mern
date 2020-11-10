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
    dispatch(setCurrentUser(res.data.user, res.data.token));
  } catch (err) {
    dispatch(setNotification(notificationNormalize(err)));
  }
};

export const checkUserLogin = (token) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}auth/check`, { token });
    dispatch(setCurrentUser(res.data.user, token));
  } catch (err) {
    dispatch(removeCurrentUser());
  }
};

export const setCurrentUser = (user, token) => ({
  type: SET_CURRENT_USER,
  user,
  token,
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
