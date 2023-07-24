import './Login.css'
import React from "react";
import logo from '../../images/logo_promo.svg';

function Login () {
  return (
    <section className="login">
       <img
          className="login__logo"
          src={logo}
          alt="Изображение логотипа"
        />
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
                  value="pochta@yandex.ru|"
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
                  value="парольпароль"
                />
                <span className="login__input-error"></span>
            </label>
            <button className="login__button" type="submit" aria-label="Сохранить">Войти</button>
            <p className="login__text">Ещё не зарегистрированы? <span className="login__link">Регистрация</span></p>
        </form>

    </section>
  )
}

export default Login;
