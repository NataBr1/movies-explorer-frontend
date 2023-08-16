import './Register.css'
import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import useFormValidation from '../../utils/useFormValidation';

function Register ({ handleRegister, errorMessage }) {
  const { values, isValid, handleChange, errors, resetForm } = useFormValidation({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, email, password } = values;
    if (isValid) {
      handleRegister({ name, email, password });
      resetForm();
    }

  };

  return (
    <main className="register">

       <Link to="/">
          <img className="register__logo" src={logo} alt="Изображение логотипа" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>

          <form onSubmit={handleSubmit} noValidate>
              <label className="register__field">
                  <span className="register__span">Имя</span>
                  <input
                    className={`register__input ${errors.name ? "register__input_error" : ""}`}
                    name="name"
                    type="text"
                    value={values.name || ""}
                    placeholder="Введите имя"
                    autoComplete="off"
                    minLength={2}
                    maxLength={30}
                    onChange={handleChange}
                    required
                  />
                  <span className={`register__input-error ${!isValid ? "register__input-error_active" : ""}`}>{errors?.name}</span>
              </label>
              <label className="register__field">
                  <span className="register__span">E-mail</span>
                  <input
                    className={`register__input ${errors.email ? "register__input_error" : ""}`}
                    name="email"
                    type="email"
                    value={values.email || ""}
                    placeholder="Введите свой e-mail"
                    autoComplete="off"
                    minLength={2}
                    maxLength={30}
                    onChange={handleChange}
                    required
                  />
                  <span className={`register__input-error ${!isValid ? "register__input-error_active" : ""}`}>{errors?.email}</span>
              </label>
              <label className="register__field">
                  <span className="register__span">Пароль</span>
                  <input
                    className={`register__input ${errors.password ? "register__input_error" : ""}`}
                    name="password"
                    type="password"
                    value={values.password || ""}
                    placeholder="Введите пароль"
                    autoComplete="off"
                    minLength={6}
                    maxLength={30}
                    onChange={handleChange}
                    required
                  />
                  <span className={`register__input-error ${!isValid ? "register__input-error_active" : ""}`}>{errors?.password}</span>
              </label>
              <div className="register__box-error"><span className="register__text-error">{errorMessage}</span></div>
              <button className={`register__button ${!isValid ? "register__button_inactive" : ""}`} type="submit" disabled={!isValid}>Зарегистрироваться</button>
              <p className="register__text">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
          </form>

    </main>
  )
}

export default Register;

