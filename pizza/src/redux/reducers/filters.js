import { SET_SORT_BY, SET_CATEGORY, SET_ORDER_DIRECTION } from '../constants'

const initialState = {
  category: null,
  sortBy: 'rating',
  orderDirection: 'desc',
}

const filters = (state = initialState, { type, category, sortBy, orderDirection }) => {
  switch (type) {
    case SET_SORT_BY:
      return {
        ...state,
        sortBy
      }
    case SET_CATEGORY:
      return {
        ...state,
        category
      }
    case SET_ORDER_DIRECTION:
      return {
        ...state,
        orderDirection
      }
    default:
      return state
  }
}

export default filters