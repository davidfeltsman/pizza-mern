import React from 'react'
import { Link } from 'react-router-dom'

import './notFound.scss'

export default function NotFound() {
  return (
    <div className="notFound">
      <h2>Error 404</h2>
      <p>Page not found</p>
      <Link to="/">Home</Link>
    </div>
  )
}
