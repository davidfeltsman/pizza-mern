import React from 'react';
import { Link } from 'react-router-dom';
import { userPostFetch } from '../../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import {
  Grid,
  Box,
  Typography,
  Button,
  CssBaseline,
  Container,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles({
  signBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10px',
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const onSubmit = (data) => {
    dispatch(userPostFetch(data));
  };
  const classes = useStyles();
  return (
    <Box className={classes.container} bgcolor="secondary.light" color="primary.main">
      <Container component="div" maxWidth="xs">
        <CssBaseline />
        <div className={classes.signBox}>
          <LockOpenIcon fontSize="large" className={classes.icon} />
          <Typography component="h1" variant="h4">
            Pizza CRM
          </Typography>
        </div>
        <form color="secondary.light" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Адресс или Логин"
            name="email"
            autoComplete="email"
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
            helperText={errors.email?.message}
            error={errors.email ? true : false}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({
              required: 'Обязательное поле',
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            margin="normal"
            size="large">
            Войти
          </Button>
          <Grid container justify="center" margin="normal">
            <Link to="/register">Нет аккаунта? Зарегистрируйтесь</Link>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
