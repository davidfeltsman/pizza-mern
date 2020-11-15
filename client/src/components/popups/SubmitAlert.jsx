import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

const types = ['пользователя', 'товар', 'заказ'];

export default function SubmitAlert({ type, open, handleClose, deleteUser }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">Вы уверены?</DialogTitle>
      <DialogContent>
        <DialogContentText>Вы уверены, что хотите удалить {types[type]}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Нет
        </Button>
        <Button onClick={deleteUser} color="primary" autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SubmitAlert.propTypes = {
  type: PropTypes.number,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  deleteUser: PropTypes.func,
};
