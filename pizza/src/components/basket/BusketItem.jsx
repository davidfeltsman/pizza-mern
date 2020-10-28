import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as PlusIcon } from '../../assets/img/plus.svg'
import { removePizzaFromBasket, addPizzaToBasket, removePizzaGroup } from '../../redux/actions/actionCreators'
import { useDispatch } from 'react-redux'

export default function BusketItem({ item, index }) {

  const { imageUrl, name, doughType, size, price, count } = item
  const dispatch = useDispatch()

  function removePizzaFromBasketHandler() {
    dispatch(removePizzaFromBasket(index))
  }
  function addPizzaToBasketHandler() {
    dispatch(addPizzaToBasket(item))
  }
  function removePizzaGroupHandler() {
    dispatch(removePizzaGroup(index))
  }

  return (
    <div className="basket__pizza-block">
      <img src={imageUrl} alt="Pizza" className="basket__pizza-img" />
      <div className="basket__pizza-content">
        <h3 className="basket__pizza-title">{name}</h3>
        <p className="basket__pizza-info">{doughType} тесто, {size} см.</p>
      </div>
      <div className="basket__counter-block">
        <button onClick={removePizzaFromBasketHandler} className="basket__pizza-button"><PlusIcon className="basket__pizza-button-minus" /></button>
        <span className="basket__pizza-counter">{count}</span>
        <button onClick={addPizzaToBasketHandler} className="basket__pizza-button"><PlusIcon className="basket__pizza-button-plus" /></button>
      </div>
      <strong className="basket__pizza-price">{count * price} ₽</strong>
      <button onClick={removePizzaGroupHandler} className="basket__pizza-remove"><PlusIcon className="basket__pizza-cross" /></button>
    </div>
  )
}

BusketItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
}
