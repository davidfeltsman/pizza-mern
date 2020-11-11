import axios from 'axios';
import { setNotification } from '../redux/actions/actionCreators';
import { BASE_URL } from '../redux/constants';
import notificationNormalize from './notificationNormalize';

axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = window.localStorage.getItem('token');
  return config;
});

export const axiosGet = async (path, dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}${path}`);
    if (res.status >= 200 && res.status < 300) {
      return res;
    } else {
      dispatch(setNotification(notificationNormalize(res)));
    }
  } catch (err) {
    dispatch(setNotification(notificationNormalize(err)));
  }
};

export const axiosPost = async (path, data, dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}${path}`, data);
    if (res.status >= 200 && res.status < 300) {
      return res;
    } else {
      dispatch(setNotification(notificationNormalize(res)));
    }
  } catch (err) {
    dispatch(setNotification(notificationNormalize(err)));
  }
};

export { axios };
