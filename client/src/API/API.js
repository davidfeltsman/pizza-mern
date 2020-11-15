import axios from 'axios';
import store from '../redux/store';
import { removeCurrentUser, setNotification } from '../redux/actions/actionCreators';
import { BASE_URL } from '../redux/constants';
import notificationNormalize from './notificationNormalize';

axios.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = window.localStorage.getItem('token');
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (res) => {
    if (res.data.message && res.status === 200) {
      store.dispatch(setNotification(res.data));
    }
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(removeCurrentUser());
    }
    store.dispatch(setNotification(notificationNormalize(err)));
    return Promise.reject(err);
  },
);

class API {
  async getData(path) {
    return await axios.get(`${BASE_URL}${path}`);
  }
  async postData(path, data) {
    return await axios.post(`${BASE_URL}${path}`, data);
  }
  async deleteData(path) {
    return await axios.delete(`${BASE_URL}${path}`);
  }
  async patchData(path) {
    return await axios.patch(`${BASE_URL}${path}`);
  }
}
const api = new API();

export { api };
