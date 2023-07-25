import './Login.css'
import React from "react";
import logo from '../../images/logo_promo.svg';
import { Link } from "react-router-dom";

function Login () {
  return (
    <section className="login">
       <Link to="/">
          <img className="login__logo" src={logo} alt="Изображение логотипа" />
        </Link>
      <h2 className="login__title">Рады видеть!</h2>
        <form>
            <label className="login__field">
                <span className="login__span">E-mail</span>
                <input
                  className="login__input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  value="pochta@yandex.ru"
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
                  placeholder="Пароль"
                  autoComplete="off"
                  value="пароль"
                  required
                />
                <span className="login__input-error"></span>
            </label>
            <button className="login__button" type="submit" aria-label="Сохранить">Войти</button>
            <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
        </form>

    </section>
  )
}

export default Login;
