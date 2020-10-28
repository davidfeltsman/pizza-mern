import { ADD_PIZZA_TO_BASKET, REMOVE_PIZZA_FROM_BASKET, REMOVE_PIZZA_GROUP, CLEAR_BASKET } from '../constants'
import { load } from 'redux-localstorage-simple'

let basketStorage = load({
  states: ['basket'],
  namespace: 'pizza-basket'
})

if (!basketStorage.basket || !basketStorage.basket.items || !basketStorage.basket.items.length) {
  basketStorage.basket = {
    items: [],
    totalCounter: 0,
    totalPrice: 0
  }
}

const basket = (state = basketStorage.basket, { type, payload }) => {
  let newItems = []
  switch (type) {
    case ADD_PIZZA_TO_BASKET:
      let equal = state.items.length
        ? state.items.findIndex(item => item.id === payload.id
          && item.doughType === payload.doughType
          && item.size === payload.size)
        : -1
      if (equal !== -1) {
        newItems = state.items.map((item, index) => index === equal
          ? { ...item, count: item.count + 1 }
          : item)
      } else {
        newItems = [...state.items, payload]
      }
      break
    case REMOVE_PIZZA_FROM_BASKET:
      if (state.items[payload] && state.items[payload].count === 1) {
        newItems = state.items.filter((item, index) => index !== payload)
      } else {
        newItems = state.items.map((item, index) => index === payload ? { ...item, count: state.items[index].count - 1 } : item)
      }
      break
    case REMOVE_PIZZA_GROUP:
      newItems = state.items.filter((item, index) => index !== payload)
      break
    case CLEAR_BASKET:
      newItems = []
      break
    default:
      return {
        ...state
      }
  }

  const currentTotalCount = newItems.length ? newItems.map(item => item.count).reduce((a, b) => a + b) : 0
  const currentTotalPrice = newItems.length ? newItems.map(item => item.count * item.price).reduce((a, b) => a + b) : 0

  return {
    ...state,
    items: newItems,
    totalCounter: currentTotalCount,
    totalPrice: currentTotalPrice
  }
}

export default basket