import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import React from "react";

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/movies" className={({ isActive }) => isActive
              ? "navigation__link navigation__link_active"
              : "navigation__link"
              }>Фильмы
      </NavLink>
      <NavLink to="/saved-movies" className={({ isActive }) => isActive
              ? "navigation__link navigation__link_active"
              : "navigation__link"
              }>Сохраненные фильмы</NavLink>
      <button className="navigation__button" type="button"><Link to="/profile" className="button__text">Аккаунт</Link></button>
    </nav>
  )
}

export default Navigation;
