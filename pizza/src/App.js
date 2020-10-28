import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTransition, animated } from 'react-spring'

import NotFound from './pages/404/NotFound'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Basket from './pages/basket/Basket'

import { fetchPizzas, setLoading } from './redux/actions/actionCreators'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchPizzas());
  }, [dispatch]);

  const location = useLocation()

  const transitions = useTransition(location, location => location.key, {
    from: { position: 'absolute', width: '100%', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  return (
    <div className="App">
      <Header location={location} />
      <div className="App__absolute-wrapper">
        {transitions.map(({ item, props: transition, key }) => (
          <animated.div key={key} style={transition}>
            <Switch location={item}>
              <Route exact path='/' component={Home} />
              <Route exact path='/basket' component={Basket} />
              <Route exact path='*' component={NotFound} />
            </Switch>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export default App
