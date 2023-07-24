import './MoviesCard.css'
import React from "react";
import img from '../../images/pic__COLOR_pic.png';


function MoviesCard() {
  return (
    <>
        <article className="moviesCard">
          <h2 className="moviesCard__title">В погоне за Бенкси</h2>
          <p className="moviesCard__diration">27 минут</p>
          <img className="moviesCard__image" src={img} alt="Карточка"/>
          <button className="moviesCard__button" area-label="Сохранить" type="submit">Сохранить</button>
        </article>

        <article className="moviesCard">
          <h2 className="moviesCard__title">В погоне за Бенкси</h2>
          <p className="moviesCard__diration">27 минут</p>
          <img className="moviesCard__image" src={img} alt="Карточка"/>
          <button className="moviesCard__button_active" area-label="Сохранить" type="submit"></button>
        </article>
    </>
)
}

export default MoviesCard;
