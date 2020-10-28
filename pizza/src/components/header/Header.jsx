import React from 'react'
import PropTypes from 'prop-types'
import PizzaLogo from '../../assets/img/pizza-logo.svg'
import { Link } from 'react-router-dom'
import './header.scss'
import { useSelector } from 'react-redux'

export default function Header({ location: { pathname } }) {

  const { totalCounter, totalPrice } = useSelector(({ basket: { totalPrice, totalCounter } }) => ({
    totalPrice,
    totalCounter,
  }))

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <img className="header__img" src={PizzaLogo} alt="Pizza Logo" />
        <div className="header__title">
          <h1 className="header__main-title">Hello Pizza</h1>
          <span className="header__sub-title">вкуснейшая пицца города</span>
        </div>
      </Link>
      {pathname === '/' && <Link className="header__busket-link" to="/basket">
        <span className="header__total-price">{totalPrice} ₽</span>
        <span className="header__total-purchases">{totalCounter}</span>
      </Link>}
    </header>
  )
}

Header.propTypes = {
  location: PropTypes.object,
}
