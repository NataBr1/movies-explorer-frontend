import './PopupEditProfile.css'
import React from "react";

function PopupEditProfile({ isOpen, onClick }) {
  return (
   <section className={`popupEditProfile ${isOpen ? "popupEditProfile_opened": ""}`} isOpen={isOpen} >
      <form className="popupEditProfile__form">
        <label className="popupEditProfile__field">
          <span className="popupEditProfile__span">Имя</span>
          <input className="popupEditProfile__name" value="Наталья"></input>
        </label>
        <label className="popupEditProfile__field">
          <span className="popupEditProfile__span">E&#8209;mail</span>
          <input className="popupEditProfile__name" value="pochta@yandex.ru"></input>
        </label>
        <button className="popupEditProfile__save"type="submit" aria-label="Сохранить" onClick={onClick}>Сохранить</button>
      </form>
   </section>
  )
}

export default PopupEditProfile;
