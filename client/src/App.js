import { Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import PrivateRoute from './components/custom/PrivateRoute';
import Dashboard from './pages/Dashboard';

function App() {
  const { user, isAuthorizate } = useSelector(({ currentUser: { user, isAuthorizate } }) => ({
    user,
    isAuthorizate,
  }));

  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" isAuthorizate={isAuthorizate} component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
