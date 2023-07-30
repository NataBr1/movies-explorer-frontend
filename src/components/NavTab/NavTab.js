import './NavTab.css'
import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

function NavTab() {
  return (
    <header className="navTab">
        <img
          className="navTab__logo"
          src={logo}
          alt="Изображение логотипа"
        />

        <nav className="navTab__box">
          <Link to="/signup" className="navTab__signup">Регистрация</Link>
          <Link to="/signin" className="navTab__signin">Войти</Link>
        </nav>

    </header>
  )
}

export default NavTab;
