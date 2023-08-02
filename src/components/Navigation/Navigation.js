import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import React from "react";

function Navigation({ showFavoriteMovies }) {
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
              } onClick={showFavoriteMovies}>Сохраненные фильмы</NavLink>
      <Link to="/profile" className="navigation__button">Аккаунт</Link>
    </nav>
  )
}

export default Navigation;
