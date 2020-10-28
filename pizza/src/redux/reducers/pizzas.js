import { SET_PIZZAS, SET_LOADING } from '../constants';

const initialState = {
  items: [],
  isLoading: true
}

const pizzas = (state = initialState, { type, items, isLoading }) => {
  switch (type) {
    case SET_PIZZAS:
      return {
        ...state,
        items,
        isLoading: false
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading
      }
    default:
      return state
  }
}

export default pizzas