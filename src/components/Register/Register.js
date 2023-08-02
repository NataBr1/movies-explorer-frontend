import './Register.css'
import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

function Register ({ handleRegister }) {
  const [formValue, setFormValue] = React.useState({
    name: '',
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
    const { name, email, password } = formValue;
    handleRegister (name, email, password)
  }

  return (
    <main className="register">

       <Link to="/">
          <img className="register__logo" src={logo} alt="Изображение логотипа" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>

          <form onSubmit={handleSubmit}>
              <label className="register__field">
                  <span className="register__span">Имя</span>
                  <input
                    className="register__input"
                    name="name"
                    type="text"
                    value={formValue.name}
                    placeholder="Введите имя"
                    autoComplete="off"
                    minLength={2}
                    maxLength={30}
                    onChange={handleChange}
                    required=""
                  />
                  <span className="register__input-error" />
              </label>
              <label className="register__field">
                  <span className="register__span">E-mail</span>
                  <input
                    className="register__input"
                    name="email"
                    type="email"
                    value={formValue.email}
                    placeholder="Введите свой e-mail"
                    autoComplete="off"
                    minLength={6}
                    maxLength={30}
                    onChange={handleChange}
                    required=""
                  />
                  <span className="register__input-error" />
              </label>
              <label className="register__field">
                  <span className="register__span">Пароль</span>
                  <input
                    className="register__input"
                    name="password"
                    type="password"
                    value={formValue.password}
                    placeholder="Введите пароль"
                    autoComplete="off"
                    minLength={6}
                    maxLength={30}
                    onChange={handleChange}
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
