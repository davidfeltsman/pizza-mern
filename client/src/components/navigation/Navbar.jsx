import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { removeCurrentUser } from '../../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  IconButton,
} from '@material-ui/core';
import {
  People,
  LocalPizza,
  MenuBook,
  AccountCircle,
  ExitToApp,
  KeyboardArrowLeft,
} from '@material-ui/icons';
const NavLinks = [
  { text: 'Пользователи', icon: <People />, route: '/dashboard/users' },
  { text: 'Товары', icon: <LocalPizza />, route: '/dashboard/products' },
  { text: 'Заказы', icon: <MenuBook />, route: '/dashboard/orders' },
];

const useStyles = makeStyles((theme) => ({
  expandButton: {
    marginLeft: 'auto',
  },
  expandButtonClosed: {
    transform: 'rotate(-180deg)',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: '60px',
  },
  drawerOpen: {
    width: '240px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function Navbar({ handleAccountButton }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeList, setActiveList] = useState(0);
  const [open, setOpen] = useState(false);

  const handleListItemClick = (e, index) => {
    setActiveList(index);
  };

  const handleExpandClick = () => {
    setOpen(!open);
  };

  const handleExitButton = () => {
    dispatch(removeCurrentUser());
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}>
      <IconButton
        className={clsx(classes.expandButton, {
          [classes.expandButtonClosed]: !open,
        })}
        onClick={handleExpandClick}>
        <KeyboardArrowLeft />
      </IconButton>
      <List>
        {NavLinks.map((link, index) => (
          <ListItem
            key={`ListItemTop${index}`}
            selected={activeList === index}
            onClick={(e) => handleListItemClick(e, index)}
            button
            component={Link}
            to={link.route}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
        <Divider variant="middle" />
        <ListItem button onClick={handleAccountButton}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Аккаунт" />
        </ListItem>
        <ListItem button onClick={handleExitButton}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Выйти" />
        </ListItem>
      </List>
    </Drawer>
  );
}

Navbar.propTypes = {
  handleAccountButton: PropTypes.func,
};

Navbar.defaultProps = {
  handleAccountButton: () => {},
};
