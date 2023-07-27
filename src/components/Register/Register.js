import './Register.css'
import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

function Register () {
  return (
    <main className="register">
       <Link to="/">
          <img className="register__logo" src={logo} alt="Изображение логотипа" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>

          <form>
              <label className="register__field">
                  <span className="register__span">Имя</span>
                  <input
                    className="register__input"
                    name="name"
                    type="text"
                    placeholder={"Наталья"}
                    autoComplete="off"
                    minLength={2}
                    maxLength={30}
                    required
                  />
                  <span className="register__input-error" />
              </label>
              <label className="register__field">
                  <span className="register__span">E-mail</span>
                  <input
                    className="register__input"
                    name="email"
                    type="email"
                    placeholder={"pochta@yandex.ru"}
                    autoComplete="off"
                    minLength={2}
                    maxLength={30}
                    required
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
                    value="пароль"
                    required
                  />
                  <span className="register__input-error">Что-то пошло не так...</span>
              </label>
              <div className="register__box-error"><span className="register__text-error">{}</span></div>
              <button className="register__button" type="submit">Зарегистрироваться</button>
              <p className="register__text">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
          </form>

    </main>
  )
}

export default Register;
