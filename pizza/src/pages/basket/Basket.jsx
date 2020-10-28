import React from 'react'
import BasketEmpty from '../../components/basket/BasketEmpty'
import BasketWithContent from '../../components/basket/BasketWithContent'
import './basket.scss'
import { useSelector } from 'react-redux'


export default function Basket() {

  const { basket } = useSelector(({ basket }) => ({
    basket
  }))

  return (
    <main className="basket">
      {basket.items.length
        ? <BasketWithContent basket={basket} />
        : <BasketEmpty />
      }

    </main>
  )
}
