import React, { useState } from 'react'
import PlusIcon from '../../assets/img/plus.svg'
import PropTypes from 'prop-types'
import SmallPizzaIcon from '../../assets/img/star.svg'
import { addPizzaToBasket } from '../../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';


const doughTypes = ["тонкое", "традиционное"]

export default function PizzaCard({ params: { id, imageUrl, name, price, sizes, types, rating }, selected }) {

  const [activeType, setActiveType] = useState(types[0])
  const [activeSize, setActiveSize] = useState(sizes[0])
  const [actualPrice, setActualPrice] = useState(price[0])
  const dispatch = useDispatch()

  function addPizzaButtonHandler() {
    const pizzaSchema = {
      id,
      imageUrl,
      name,
      price: actualPrice,
      size: activeSize,
      doughType: doughTypes[activeType],
      count: 1,
    }
    dispatch(addPizzaToBasket(pizzaSchema))
  }
  function sizeChangeHandler(size, index) {
    setActiveSize(size);
    setActualPrice(price[index])
  }
  const equalInBasket = selected.find(item => item.id === id && item.doughType === doughTypes[activeType] && item.size === activeSize)
  const counter = equalInBasket ? equalInBasket.count : null
  return (
    <div className="pizza-card">
      <div className="pizza-card__rating">
        <span className="pizza-card__rating-value">{rating}/10</span>
        <img src={SmallPizzaIcon} alt="Rating" className="pizza-card__rating-img" />
      </div>
      <img src={imageUrl} alt={name} className="pizza-card__image" />
      <h3 className="pizza-card__title">{name}</h3>
      <div className="pizza-card__options">
        <ul className="pizza-card__thickness">
          {types.map((type, index) => (
            <li key={"type" + index}>
              <button
                type="button"
                className={activeType === type ? "pizza-card__option pizza-card__option_active" : "pizza-card__option"}
                onClick={() => setActiveType(type)}
              >
                {doughTypes[type]}
              </button>
            </li>))}
        </ul>
        <ul className="pizza-card__size">
          {sizes.map((size, index) => (
            <li key={"size" + index}>
              <button
                type="button"
                className={activeSize === size ? "pizza-card__option pizza-card__option_active" : "pizza-card__option"}
                onClick={() => sizeChangeHandler(size, index)}
              >{size} см.
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-card__footer">
        <span className="pizza-card__price">{actualPrice} ₽</span>
        <button onClick={addPizzaButtonHandler} className="pizza-card__add-button">
          <img className="pizza-card__add-button-icon" src={PlusIcon} alt="+" /> Добавить {counter && <span className=" pizza-card__counter">{counter}</span>}
        </button>
      </div>
    </div>
  )
}

PizzaCard.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.array,
  sizes: PropTypes.array,
  types: PropTypes.array,
  rating: PropTypes.number,
  selected: PropTypes.array
}

PizzaCard.defaultProps = {
  imageUrl: "https://img.icons8.com/ios/452/pizza.png",
  name: "Пицца",
  price: [],
  sizes: [],
  types: [],
  rating: 0,
  selected: []
}