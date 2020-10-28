import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useTransition, animated, config } from 'react-spring'

export default function Order({ sortBy, orderDirection, onOrderClick, onSortByClick }) {

  const orderRus = ['популярности', 'цене', 'алфавиту']
  const orderEng = ['rating', 'price', 'name']

  let currentOption = getCurrentOption()

  function getCurrentOption() {
    return orderRus[orderEng.findIndex(order => order === sortBy)]
  }

  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const orderRef = useRef()

  useEffect(() => {
    document.addEventListener('click', outsideClickHandler)
    return () => {
      document.removeEventListener('click', outsideClickHandler)
    }
  }, [])

  function togglePopUpOpen(value) {
    setIsPopUpOpen(value)
  }
  function outsideClickHandler(e) {
    let path = e.path || (e.composedPath && e.composedPath())
    if (!path.includes(orderRef.current)) {
      setIsPopUpOpen(false)
    }
  }

  const transitions = useTransition(isPopUpOpen, null, {
    from: {
      transform: 'rotateX(-100deg)',
      transformOrigin: 'top',
      opacity: 0,
    },
    enter: { transform: 'rotateX(0deg)', transformOrigin: 'top', opacity: 1 },
    leave: {
      transform: 'rotateX(-100deg)',
      transformOrigin: 'top',
      opacity: 0
    },
    config: config.wobbly
  })

  return (
    <div ref={orderRef} className="categories__order">
      <div className="categories__wrapper">
        <button
          onClick={onOrderClick}
          className={orderDirection === 'desc'
            ? "categories__title categories__title_desc"
            : "categories__title"}
        >
          Cортировка&nbsp;по:
        </button>
        <button
          onClick={() => togglePopUpOpen(!isPopUpOpen)}
          className="categories__current-option"
        >
          {currentOption}
        </button>
      </div>
      {transitions.map(({ item, key, props }) => (
        item && <animated.ul key={key} style={props} className="categories__order-list">
          {orderRus.map((value, index) => (
            <li key={value + index} className="categories__option">
              <button
                onClick={() => onSortByClick(orderEng[index])}
                className={sortBy === orderEng[index]
                  ? "categories__button categories__button_active"
                  : "categories__button"}
              >
                {value}
              </button>
            </li>
          ))}
        </animated.ul>
      ))}
    </div>
  )
}

Order.propTypes = {
  sortBy: PropTypes.string.isRequired,
  orderDirection: PropTypes.string.isRequired,
  onOrderClick: PropTypes.func.isRequired,
  onSortByClick: PropTypes.func.isRequired
}

Order.defauldProps = {
  sortBy: 'rating',
  orderDirection: 'desc',
  onOrderClick: () => { },
  onSortByClick: () => { }
}