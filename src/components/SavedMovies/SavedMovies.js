import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import img from '../../images/pic__COLOR_pic.png';
import './SavedMovies.css';
import React from "react";

function SavedMovies ({ isPopupMenu, closePopup, handlePopupMenuClick }) {

  return (
    <section className="savedMovies">
      <PopupMenu isOpen={isPopupMenu} onClose={closePopup} />
      <Header onOpenPopupMenu={handlePopupMenuClick} />
      <SearchForm />
      <section className="moviesCardList">
        <article className="moviesCard">
          <h2 className="moviesCard__title">В погоне за Бенкси</h2>
          <p className="moviesCard__diration">27 минут</p>
          <img className="moviesCard__image" src={img} alt="Карточка"/>
          <button className="moviesCard__button moviesCard__button_delete" area-label="Сохранить" type="submit"></button>
        </article>

        <article className="moviesCard">
          <h2 className="moviesCard__title">В погоне за Бенкси</h2>
          <p className="moviesCard__diration">27 минут</p>
          <img className="moviesCard__image" src={img} alt="Карточка"/>
          <button className="moviesCard__button moviesCard__button_delete" area-label="Сохранить" type="submit"></button>
        </article>

        <article className="moviesCard">
          <h2 className="moviesCard__title">В погоне за Бенкси</h2>
          <p className="moviesCard__diration">27 минут</p>
          <img className="moviesCard__image" src={img} alt="Карточка"/>
          <button className="moviesCard__button moviesCard__button_delete" area-label="Сохранить" type="submit"></button>
        </article>

        <article className="moviesCard">
          <h2 className="moviesCard__title">В погоне за Бенкси</h2>
          <p className="moviesCard__diration">27 минут</p>
          <img className="moviesCard__image" src={img} alt="Карточка"/>
          <button className="moviesCard__button moviesCard__button_delete" area-label="Сохранить" type="submit"></button>
        </article>
      </section>
      <div className="savedMovies__empty-box"></div>
      <Footer />
    </section>

  );
};

export default SavedMovies ;
