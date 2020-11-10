import { combineReducers } from 'redux';
import currentUser from './currentUser';
import notificationAPI from './notification';

const rootReducer = combineReducers({
  currentUser,
  notificationAPI,
});

export default rootReducer;
