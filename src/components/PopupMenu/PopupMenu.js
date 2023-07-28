import './PopupMenu.css';
import React from "react";
import { Link, NavLink } from 'react-router-dom';

function PopupMenu({ isOpen, onClose }) {
  return (
   <section className={`popupMenu ${isOpen ? "popupMenu_opened": ""}`} >
      <button className="popupMenu__close" type="button" onClick={onClose} />

      <nav className="popupMenu__box">
        <ul className="popupMenu__navigation">
          <li className="popupMenu__item" onClick={onClose}>
            <Link to="/" className="popupMenu__link">Главная</Link>
          </li>
          <li className="popupMenu__item" onClick={onClose}>
            <NavLink to="/movies" className={({ isActive }) => isActive
                    ? "popupMenu__link popupMenu__link_active"
                    : "popupMenu__link"
                    }>Фильмы
            </NavLink>
          </li>
          <li className="popupMenu__item" onClick={onClose}>
            <NavLink to="/saved-movies" className={({ isActive }) => isActive
                    ? "popupMenu__link popupMenu__link_active"
                    : "popupMenu__link"
                    }>Сохраненные фильмы</NavLink>
          </li>
        </ul>
      </nav>

      <Link to="/profile" className="popupMenu__button" onClick={onClose}>Аккаунт</Link>
   </section>
  )
}

export default PopupMenu;
