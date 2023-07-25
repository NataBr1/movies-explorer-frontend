import './MoviesCard.css'
import img from '../../images/pic__COLOR_pic.png';
import React from "react";
import { useLocation } from 'react-router-dom';


function MoviesCard() {
  const location = useLocation();
  const [isSaveMovie, setIsSaveMovie] = React.useState(false);

  function handleToggleButton() {
    setIsSaveMovie(!isSaveMovie)
  }

  return (
    <>
        <article className="moviesCard">
          <h2 className="moviesCard__title">В погоне за Бенкси</h2>
          <p className="moviesCard__diration">27 минут</p>
          <img className="moviesCard__image" src={img} alt="Карточка"/>
          {location.pathname === "/movies" ? (
            <button className={`moviesCard__button ${isSaveMovie ? "" : "moviesCard__button_active"}`} type="button" onClick={handleToggleButton}>{`${isSaveMovie ? "Сохранить" : ""}`}</button>
          ) : (
            <button className="moviesCard__button_delete" type="button"></button>
          )}
        </article>
    </>
)
}

export default MoviesCard;
