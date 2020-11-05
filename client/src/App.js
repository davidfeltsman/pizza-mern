import { Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import PrivateRoute from './components/custom/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Register from './components/Auth/Register';

function App() {
  const { user, isAuthorizate } = useSelector(({ currentUser: { user, isAuthorizate } }) => ({
    user,
    isAuthorizate,
  }));
  // Авторизация
  // Регистрация
  // Дашборд
  // Кабинет пользователя
  // Роль
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/" isAuthorizate={isAuthorizate} component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
