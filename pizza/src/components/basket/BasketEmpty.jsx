import React from 'react'
import { Link } from 'react-router-dom'
import EmptyLogo from '../../assets/img/empty-cart.png'

export default function BasketEmpty() {
  return (
    <div className="basket__empty">
      <h2 className="basket__empty-title">Корзина пуста</h2>
      <p className="basket__empty-text">Вероятнее всего, вы еще не заказали пиццу.</p>
      <p className="basket__empty-text">Для того, чтобы сделать заказ, перейдите на главную страницу.</p>
      <img src={EmptyLogo} alt="Empty" />
      <Link className="basket__empty-link" to="/">Вернуться назад</Link>
    </div>
  )
}
