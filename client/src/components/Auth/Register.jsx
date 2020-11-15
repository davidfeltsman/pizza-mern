import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
import { setNotification } from '../../redux/actions/actionCreators';
import { api } from '../../API/API';

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
  succesMessage: {
    marginTop: '15px',
    borderRadius: '5px',
    backgroundColor: '#8eff6a',
    padding: '10px',
  },
});

export default function Register() {
  const [regMessage, setRegMessage] = useState({
    status: false,
    email: '',
  });
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const onSubmit = (data) => {
    api.postData('auth/register', data).then((res) => {
      if (res) {
        setRegMessage({
          status: true,
          email: data.email,
        });
        dispatch(
          setNotification({
            status: res.data.status,
            message: 'Регистрация успешна',
          }),
        );
      }
    });
  };
  const classes = useStyles();
  return (
    <Box className={classes.container} bgcolor="secondary.light" color="primary.main">
      <Container component="div" maxWidth="xs">
        <CssBaseline />
        <div className={classes.signBox}>
          <PersonAddIcon fontSize="large" className={classes.icon} />
          <Typography component="h1" variant="h4">
            Регистрация
          </Typography>
        </div>
        <form color="secondary.light" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Адресс"
            name="email"
            autoComplete="email"
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
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Логин"
            name="username"
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
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Повторите пароль"
            type="password"
            id="passwordConfirm"
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
            helperText={errors.passwordConfirm?.message}
            error={errors.passwordConfirm ? true : false}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            margin="normal"
            size="large">
            Зарегистрироваться
          </Button>
          <Grid container justify="center" margin="normal">
            <Link to="/login">Уже есть аккаунт? Войти</Link>
          </Grid>
        </form>
        {regMessage.status && (
          <Typography className={classes.succesMessage} variant="body2" component="p" gutterBottom>
            Регистрация прошла успешно. На указанный вами email адресс{' '}
            <strong>{regMessage.email}</strong> было отправлено письмо с ссылкой на подтверждение.
            Пожалуйста, перейдите по отправленной ссылке, чтобы завершить регистрацию.
          </Typography>
        )}
      </Container>
    </Box>
  );
}
