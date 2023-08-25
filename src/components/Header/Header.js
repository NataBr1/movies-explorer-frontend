import './Header.css';
import React from "react";
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.svg"

function Header({ onClick, classNameHeader }) {
  return (
    <header className={classNameHeader}>
        <Link className="header__logo" to="/">
          <img src={logo} alt="Изображение логотипа" />
        </Link>

        <Navigation />

        <button className="header__burger" type="button" onClick={onClick} ></button>

    </header>
  )
}

export default Header;

