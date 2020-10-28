import React from 'react'
import './error.scss'

export default function ErrorModule() {
  return (
    <div className="error-module">
      <img src="https://img.icons8.com/ios/452/pizza.png" alt="PizzaIcon" />
      <h2>Что-то пошло не так :c</h2>
      <p>Скорее всего сервер временно не работает, восстанавливаем данные как можно скорее, приносим извинения за неудобства</p>
    </div>
  )
}
