import React from 'react';

import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

export default function EditUserPopUp({ user, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        Редактировать пользователя {user.username}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            size="small"
            margin="normal"
            fullWidth
            id="email"
            label="Email Адресс"
            name="email"
            autoComplete="email"
            defaultValue={user.email}
            inputRef={register({
              required: 'Обязательное поле',
              minLength: {
                value: 5,
                message: 'Минимум 5 символов',
              },
              maxLength: {
                value: 40,
                message: 'Максимум 40 символов',
              },
            })}
            helperText={errors.email?.message}
            error={errors.email ? true : false}
          />
          <TextField
            size="small"
            margin="normal"
            fullWidth
            id="username"
            label="Логин"
            name="username"
            defaultValue={user.username}
            autoComplete="username"
            inputRef={register({
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа',
              },
              maxLength: {
                value: 40,
                message: 'Максимум 40 символов',
              },
            })}
            helperText={errors.username?.message}
            error={errors.username ? true : false}
          />
          <Typography>Сменить пароль:</Typography>
          <TextField
            size="small"
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({
              minLength: {
                value: 6,
                message: 'Минимум 6 символов',
              },
              maxLength: {
                value: 99,
                message: 'Максимум 99 символов',
              },
            })}
            helperText={errors.password?.message}
            error={errors.password ? true : false}
          />
          {/* Submit on change ???  */}
          {/* Роли - select */}
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={() => console.log('eee')} color="primary" autoFocus>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditUserPopUp.propTypes = {
  user: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
};
