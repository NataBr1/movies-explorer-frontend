import './PopupMenu.css';
import React from "react";
import { Link, NavLink } from 'react-router-dom';

function PopupMenu({ isOpen, onClose }) {
  return (
   <section className={`popupMenu ${isOpen ? "popupMenu_opened": ""}`} isOpen={isOpen} >
      <button className="popupMenu__close" tyoe="button" onClick={onClose} />

      <div className="popupMenu__box">
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
      </div>

      <button className="popupMenu__button" type="button"><Link to="/profile" className="popupMenu__button-text" onClick={onClose}>Аккаунт</Link></button>
   </section>
  )
}

export default PopupMenu;
