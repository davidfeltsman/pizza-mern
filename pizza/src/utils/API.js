import axios from 'axios';

export default axios.create({
  baseURL: '/db.json',
  responseType: "json"
});