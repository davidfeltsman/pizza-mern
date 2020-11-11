import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  notFound: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.notFound}>
      <Typography variant="h2">Page not found</Typography>
      <Button variant="filled" color="primary" component={Link} to="/dashboard">
        Перейти на главную
      </Button>
    </div>
  );
}
