import React from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

export default function Login() {
  return (
    <div className="auth">
      <h1>Pizza CRM </h1>
      <form className="auth-form">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email адресс или логин</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text text-muted">
            Убедитесь, что введенный вами Email подтвержден
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Пароль</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-lg btn-outline-dark">
            Войти
          </button>
          <Link className="register-link" to="/register">
            Нет аккаунта? Нажмите, чтобы зарегистрироваться в системе
          </Link>
        </div>
      </form>
    </div>
  );
}
