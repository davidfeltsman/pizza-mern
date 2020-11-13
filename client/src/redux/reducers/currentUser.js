import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../constants';

const initialState = {
  user: {},
  isAuthorizate: localStorage.getItem('token') ? true : false,
};

const currentUser = (state = initialState, { type, user }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user,
        isAuthorizate: true,
      };
    case REMOVE_CURRENT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        user: {},
        isAuthorizate: false,
      };
    default:
      return state;
  }
};

export default currentUser;
