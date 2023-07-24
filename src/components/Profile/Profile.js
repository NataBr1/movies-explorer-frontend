import Header from '../Header/Header';
import PopupEditProfile from '../PopupEditProfile/PopupEditProfile';
import './Profile.css'
import React from "react";

function Profile ({ onClickOpen, isOpen, onClickClose }) {
  return (
    <section className="profile">
      <Header />
      <h2 className="profile__title">Привет, Наталья!</h2>

      <div className="profile__box">

        <PopupEditProfile isOpen={isOpen} onClick={onClickClose}/>

          <div className={`profile__form ${isOpen ? "profile__form_hidden": ""}`}>

            <div className="profile__field">
              <p className="profile__span">Имя</p>
              <p className="profile__name">Наталья</p>
            </div>

            <div className="profile__field">
              <p className="profile__span">E&#8209;mail</p>
              <p className="profile__name">pochta@yandex.ru</p>
            </div>

            <button className="profile__edit" onClick={onClickOpen}>Редактировать</button>

            <button className="profile__exit">Выйти из аккаунта</button>

          </div>



      </div>

    </section>
  )
}

export default Profile;

