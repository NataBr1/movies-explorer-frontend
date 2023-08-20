import './Login.css'
import React from "react";
import logo from '../../images/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import useFormValidation from '../../utils/useFormValidation';

function Login ({ handleLogin, errorMessage, loggedIn, isLoading }) {
  const { values, isValid, handleChange, errors } = useFormValidation({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, [loggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (isValid) {
      handleLogin({ email, password });
    }
  }

  return (
    <main className="login">

       <Link to="/">
          <img className="login__logo" src={logo} alt="Изображение логотипа" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>

          <form className="form" onSubmit={handleSubmit} noValidate >
              <label className="login__field">
                  <span className="login__span">E-mail</span>
                  <input
                    className={`login__input ${errors.email ? "login__input_error" : ""}`}
                    name="email"
                    type="email"
                    value={values.email || ""}
                    placeholder="Введите свой e-mail"
                    autoComplete="off"
                    pattern='^.+@.+..+$'
                    minLength={2}
                    maxLength={30}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                  <span className={`login__input-error ${!isValid ? "login__input-error_active" : ""}`}>{errors?.email}</span>
              </label>
              <label className="login__field">
                  <span className="login__span">Пароль</span>
                  <input
                    className={`login__input ${errors.password ? "login__input_error" : ""}`}
                    name="password"
                    type="password"
                    value={values.password || ""}
                    placeholder="Введите пароль"
                    autoComplete="off"
                    minLength={6}
                    maxLength={30}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                  <span className={`login__input-error ${!isValid ? "login__input-error_active" : ""}`}>{errors?.password}</span>
              </label>
              <div className="login__box-error"><span className="login__text-error">{errorMessage}</span></div>
              <button className={`login__button ${!isValid ? "login__button_inactive" : ""}`} type="submit" disabled={!isValid || isLoading}>Войти</button>
              <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
          </form>

    </main>
  )
}

export default Login;


// {`login__button ${isValid ? "_disactive" : ""}`} type="submit" disabled={!isValid}
