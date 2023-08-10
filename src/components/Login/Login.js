import './Login.css'
import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

function Login ({ handleLogin }) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    handleLogin({ email, password });
  }

  return (
    <main className="login">

       <Link to="/">
          <img className="login__logo" src={logo} alt="Изображение логотипа" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>

          <form onSubmit={handleSubmit} noValidate >
              <label className="login__field">
                  <span className="login__span">E-mail</span>
                  <input
                    className="login__input"
                    name="email"
                    type="email"
                    value={formValue.email}
                    placeholder="Введите свой e-mail"
                    autoComplete="off"
                    minLength={6}
                    maxLength={30}
                    onChange={handleChange}
                    required
                  />
                  <span className="login__input-error"></span>
              </label>
              <label className="login__field">
                  <span className="login__span">Пароль</span>
                  <input
                    className="login__input"
                    name="password"
                    type="password"
                    value={formValue.password}
                    placeholder="Введите пароль"
                    autoComplete="off"
                    minLength={6}
                    maxLength={30}
                    onChange={handleChange}
                    required
                  />
                  <span className="login__input-error"></span>
              </label>
              <div className="login__box-error"><span className="login__text-error">{}</span></div>
              <button className="login__button">Войти</button>
              <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
          </form>

    </main>
  )
}

export default Login;


// {`login__button ${isValid ? "_disactive" : ""}`} type="submit" disabled={!isValid}
