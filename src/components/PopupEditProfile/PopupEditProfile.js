import './PopupEditProfile.css'
import React from "react";

function PopupEditProfile({ isOpen, onClick }) {
  return (
   <section className={`popupEditProfile ${isOpen ? "popupEditProfile_opened": ""}`} >
      <form className="popupEditProfile__form">
        <label className="popupEditProfile__field">
          <span className="popupEditProfile__span">Имя</span>
          <input
            className="popupEditProfile__input"
            type="text"
            defaultValue={"Наталья"}
            placeholder="Введите имя"
            autoComplete="off"
            minLength={2}
            maxLength={30}
            required>
          </input>
        </label>
        <label className="popupEditProfile__field">
          <span className="popupEditProfile__span">E&#8209;mail</span>
          <input
            className="popupEditProfile__input"
            type="email"
            defaultValue={"pochta@yandex.ru"}
            placeholder="Введите свой e-mail"
            autoComplete="off"
            minLength={2}
            maxLength={30}
            required>
          </input>
        </label>
        <div className="popupEditProfile__box-error"><span className="popupEditProfile__text-error">{}</span></div>
        <button className="popupEditProfile__save"type="submit" onClick={onClick}>Сохранить</button>
      </form>
   </section>
  )
}

export default PopupEditProfile;
