import React from 'react';

export default function Register() {
  return (
    <div className="auth">
      <h1>Регистрация</h1>
      <form className="auth-form">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email адресс</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Пароль</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Повторите пароль</label>
          <input type="password" className="form-control" id="exampleInputPassword2" />
        </div>
        <button type="submit" className="btn btn-lg btn-outline-dark w-100 mt-3">
          Создать аккаунт
        </button>
      </form>
    </div>
  );
}
