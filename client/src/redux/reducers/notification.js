import { REMOVE_NOTIFICATION, SET_NOTIFICATION } from '../constants';

const initialState = {
  notifications: [],
};

const notificationAPI = (state = initialState, { type, data, id }) => {
  switch (type) {
    case SET_NOTIFICATION:
      if (Array.isArray(data)) {
        return {
          ...state,
          notifications: [...state.notifications, ...data],
        };
      } else {
        return {
          ...state,
          notifications: [...state.notifications, data],
        };
      }

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter((item) => item.id !== id),
      };
    default:
      return state;
  }
};

export default notificationAPI;
