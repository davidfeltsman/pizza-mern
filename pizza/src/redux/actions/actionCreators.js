import {
  SET_SORT_BY,
  SET_CATEGORY,
  SET_PIZZAS,
  SET_LOADING,
  SET_ORDER_DIRECTION,
  ADD_PIZZA_TO_BASKET,
  REMOVE_PIZZA_FROM_BASKET,
  REMOVE_PIZZA_GROUP,
  CLEAR_BASKET
} from '../constants'
import API from '../../utils/API'

//filters
export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  sortBy
})

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  category
})

export const setOrderDirection = (orderDirection) => ({
  type: SET_ORDER_DIRECTION,
  orderDirection
})

//pizzas
export const fetchPizzas = () => (dispatch) => {
  API.get()
    .then(({ data }) => dispatch(setPizzas(data.pizzas)))
    .catch(err => alert('Ошибка загрузки данных'));
}

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  isLoading
})

export const setPizzas = (items) => ({
  type: SET_PIZZAS,
  items
})

//basket
export const addPizzaToBasket = (obj) => ({
  type: ADD_PIZZA_TO_BASKET,
  payload: obj
})

export const removePizzaFromBasket = (current) => ({
  type: REMOVE_PIZZA_FROM_BASKET,
  payload: current
})

export const removePizzaGroup = (current) => ({
  type: REMOVE_PIZZA_GROUP,
  payload: current
})

export const clearBasket = () => ({
  type: CLEAR_BASKET
})

export const setTotalPrice = () => ({
  type: 'SET_TOTAL_PRICE'
})
