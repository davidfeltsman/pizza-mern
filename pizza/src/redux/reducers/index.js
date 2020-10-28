import { combineReducers } from 'redux'
import filtersReducer from './filters'
import pizzasReducer from './pizzas'
import basketReducer from './basket'

const rootReducer = combineReducers({
  filters: filtersReducer,
  pizzas: pizzasReducer,
  basket: basketReducer
})

export default rootReducer