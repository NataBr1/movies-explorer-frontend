import './PopupMenu.css'
import React from "react";

function PopupMenu({ isOpen, onClose }) {
  return (
   <section className={`popupMenu ${isOpen ? "popupMenu_opened": ""}`} isOpen={isOpen} >
      <button className="popupMenu__close" onClick={onClose} />

      <div className="popupMenu__box">
        <ul className="popupMenu__navigation">
          <li className="popupMenu__item">Главная</li>
          <li className="popupMenu__item">Фильмы</li>
          <li className="popupMenu__item">Сохраненные фильмы</li>
        </ul>
      </div>

      <button className="popupMenu__button">Аккаунт</button>
   </section>
  )
}

export default PopupMenu;
