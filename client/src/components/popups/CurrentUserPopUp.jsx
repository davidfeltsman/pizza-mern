import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';

import {
  ListItemIcon,
  ListItemText,
  Slide,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  List,
  Dialog,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CurrentUserPopUp({ user, handleClose, open }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Личный кабинет
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemIcon>
            <ListItemText primary={user.username} />
          </ListItemIcon>
        </List>
      </Dialog>
    </div>
  );
}

CurrentUserPopUp.propTypes = {
  user: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

CurrentUserPopUp.defaultProps = {
  user: {},
};
