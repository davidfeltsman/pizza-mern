import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Navbar from '../components/navigation/Navbar';
import CurrentUserPopUp from '../components/popups/CurrentUserPopUp';
import Users from './Users';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  main: {
    padding: '8px',
    width: '100%',
  },
}));

export default function Dashboard({ user }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleAccountButton = () => {
    setOpen(true);
  };

  const handleCloseAccount = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CurrentUserPopUp user={user} handleClose={handleCloseAccount} open={open} />
      <Navbar handleAccountButton={handleAccountButton} />
      <main className={classes.main}>
        <Switch>
          <Route path="/dashboard/users" component={Users} />
          <Route path="/dashboard/products" component={Users} />
          <Route path="/dashboard/orders" component={Users} />
          <Redirect exact from="/dashboard/*" to="/dashboard/users" />
          <Redirect exact from="/dashboard" to="/dashboard/users" />
        </Switch>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

Dashboard.defaultProps = {
  user: {},
};
