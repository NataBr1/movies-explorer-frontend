import './Header.css'
import React from "react";
import logo from '../../images/logo_promo.svg';
//import { Link } from "react-router-dom";

function Header({ onOpenPopupMenu }) {
  return (
    <header className="header">
        <img
          className="header__logo"
          src={logo}
          alt="Изображение логотипа"
        />

        <div className="header__navigation">
          <p className="movies-all">Фильмы</p>
          <p className="movies-save">Сохраненные фильмы</p>
          <button className="header__button">Аккаунт</button>
        </div>

        <button className="header__burger" onClick={onOpenPopupMenu} ></button>

        {/* <div className="header__navigation_main">
          <button className="signup_main">Регистрация</button>
          <button className="signin_main">Войти</button>
        </div> */}

    </header>
  )
}

export default Header;

