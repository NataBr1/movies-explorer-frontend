import './Login.css'
import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

function Login () {
  return (
    <main className="login">
      
       <Link to="/">
          <img className="login__logo" src={logo} alt="Изображение логотипа" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>

          <form>
              <label className="login__field">
                  <span className="login__span">E-mail</span>
                  <input
                    className="login__input"
                    name="email"
                    type="email"
                    defaultValue={"pochta@yandex.ru"}
                    placeholder="Введите свой e-mail"
                    autoComplete="off"
                    minLength={6}
                    maxLength={30}
                    required
                  />
                  <span className="login__input-error" />
              </label>
              <label className="login__field">
                  <span className="login__span">Пароль</span>
                  <input
                    className="login__input"
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    autoComplete="off"
                    minLength={6}
                    maxLength={30}
                    required
                  />
                  <span className="login__input-error"></span>
              </label>
              <div className="login__box-error"><span className="login__text-error">{}</span></div>
              <button className="login__button" type="submit">Войти</button>
              <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
          </form>

    </main>
  )
}

export default Login;
