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
          <button className="navTab__signin" type="button"><Link to="/signin" className="signin__link">Войти</Link></button>
        </nav>

    </header>
  )
}

export default NavTab;
