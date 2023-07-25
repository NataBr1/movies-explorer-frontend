import './NavTab.css'
import React from "react";
import logo from '../../images/logo_promo.svg';
import { Link } from "react-router-dom";

function NavTab({ onOpenPopupMenu }) {
  return (
    <header className="navTab">
        <img
          className="navTab__logo"
          src={logo}
          alt="Изображение логотипа"
        />

        <div className="navTab__box">
          <Link to="/signup" className="navTab__signup">Регистрация</Link>
          <Link to="/signin" className="navTab__signin">Войти</Link>
        </div>

    </header>
  )
}

export default NavTab;
