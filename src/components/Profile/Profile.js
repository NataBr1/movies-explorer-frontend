import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import PopupEditProfile from '../PopupEditProfile/PopupEditProfile';
import PopupMenu from "../PopupMenu/PopupMenu";
import './Profile.css'
import React from "react";

function Profile ({ onClick, isOpen, onClose, onClickEditProfile, isOpenEditProfile, onCloseEditProfile }) {
  return (
    <main className="profile">
      <PopupMenu isOpen={isOpen} onClose={onClose} />
      <Header onClick={onClick} />

      <h1 className="profile__title">Привет, Наталья!</h1>

      <section className="profile__box">

        <PopupEditProfile isOpen={isOpenEditProfile} onClose={onCloseEditProfile}/>

        <div className={`profile__form ${isOpenEditProfile ? "profile__form_hidden": ""}`}>
          <div className="profile__field">
            <p className="profile__span">Имя</p>
            <p className="profile__name">Наталья</p>
          </div>
          <div className="profile__field">
            <p className="profile__span">E&#8209;mail</p>
            <p className="profile__name">pochta@yandex.ru</p>
          </div>
          <button className="profile__edit" type="button" onClick={onClickEditProfile}>Редактировать</button>
          <button className="profile__exit" type="button"><Link to="/" className="buttonExit__text">Выйти из аккаунта</Link></button>
        </div>

      </section>

    </main>
  )
}

export default Profile;

