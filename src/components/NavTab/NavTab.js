import './NavTab.css'
import React from "react";
import logo from '../../images/logo_promo.svg';
//import { Link } from "react-router-dom";

function NavTab({ onOpenPopupMenu }) {
  return (
    <header className="navTab">
        <img
          className="navTab__logo"
          src={logo}
          alt="Изображение логотипа"
        />

        <div className="navTab__box">
          <button className="navTab__signup">Регистрация</button>
          <button className="navTab__signin">Войти</button>
        </div>

    </header>
  )
}

export default NavTab;
