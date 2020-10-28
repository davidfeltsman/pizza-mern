import React from 'react'
import PizzaCard from '../pizza-card/PizzaCard'
import PropTypes from 'prop-types'
import './mainpizza.scss'

export default function MainPizza({ items, selected }) {

  return (
    <section className="pizza-wrapper">
      {items.map(item => <PizzaCard key={'pizza' + item.id} params={item} selected={selected} />
      )}
    </section>
  )
}

MainPizza.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.array,
}

MainPizza.defauldProps = {
  items: [],
  selected: []
}