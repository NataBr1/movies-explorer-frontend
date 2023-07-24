import './Register.css'
import React from "react";
import logo from '../../images/logo_promo.svg';

function Register () {
  return (
    <section className="register">
       <img
          className="register__logo"
          src={logo}
          alt="Изображение логотипа"
        />
      <h2 className="register__title">Добро пожаловать!</h2>
        <form>
            <label className="register__field">
                <span className="register__span">Имя</span>
                <input
                  className="register__input"
                  name="name"
                  type="text"
                  placeholder="Наталья"
                  autoComplete="off"
                  value="Наталья"
                />
                <span className="register__input-error" />
            </label>
            <label className="register__field">
                <span className="register__span">E-mail</span>
                <input
                  className="register__input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  value="pochta@yandex.ru|"
                />
                <span className="register__input-error" />
            </label>
            <label className="register__field">
                <span className="register__span">Пароль</span>
                <input
                  className="register__input"
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  autoComplete="off"
                  value="парольпароль"
                />
                <span className="register__input-error">Что-то пошло не так...</span>
            </label>
            <button className="register__button" type="submit" aria-label="Сохранить">Зарегистрироваться</button>
            <p className="register__text">Уже зарегистрированы? <span className="register__link">Войти</span></p>
        </form>

    </section>
  )
}

export default Register;
