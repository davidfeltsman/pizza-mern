import React from 'react'
import Categories from '../../components/categories/Categories'
import MainPizza from '../../components/main-pizza/MainPizza'
import Loader from '../../components/loader/Loader'
import { orderBy } from 'lodash'

import { useSelector } from 'react-redux'

export default function Home() {

  const { items, isLoading, category, sortBy, orderDirection, selected } = useSelector(({ pizzas: { items, isLoading }, filters: { category, sortBy, orderDirection }, basket }) => ({
    items,
    isLoading,
    category,
    sortBy,
    orderDirection,
    selected: basket.items
  }));

  const categoried = (category !== null)
    ? items.filter(item => item.category.includes(category))
    : items
  const filteredItems = orderBy(categoried, sortBy, orderDirection)

  return (
    <main className="main-content">
      {isLoading
        ? <Loader />
        : <>
          <Categories
            items={items}
            activeCategory={category}
            orderDirection={orderDirection}
            sortBy={sortBy}
          />
          <MainPizza items={filteredItems} selected={selected} />
        </>
      }

    </main>
  )
}