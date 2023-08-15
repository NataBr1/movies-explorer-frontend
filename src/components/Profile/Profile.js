import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from '../Header/Header';
import PopupEditProfile from '../PopupEditProfile/PopupEditProfile';
import PopupMenu from "../PopupMenu/PopupMenu";
import './Profile.css'
import React from "react";

function Profile ({ onClick, isOpen, onClose, onClickEditProfile, isOpenEditProfile, onCloseEditProfile, onUpdateUser, errorMessage, signOut }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="profile">
      <PopupMenu isOpen={isOpen} onClose={onClose} />

      <Header onClick={onClick} classNameHeader={"header"}/>

      <main>
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>

        <section className="profile__box">

          <PopupEditProfile
            isOpen={isOpenEditProfile}
            onClose={onCloseEditProfile}
            onUpdateUser={onUpdateUser}
            errorMessage={errorMessage}/>

          <div className={`profile__form ${isOpenEditProfile ? "profile__form_hidden": ""}`}>
            <div className="profile__field">
              <p className="profile__span">Имя</p>
              <p className="profile__name">{currentUser.name}</p>
            </div>
            <div className="profile__field">
              <p className="profile__span">E&#8209;mail</p>
              <p className="profile__name">{currentUser.email}</p>
            </div>
            <button className="profile__edit" type="button" onClick={onClickEditProfile}>Редактировать</button>
            <Link to="/" className="profile__exit" onClick={signOut} >Выйти из аккаунта</Link>
          </div>

        </section>

      </main>

    </div>
  )
}

export default Profile;

