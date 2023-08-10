import './MoviesCard.css'
import React from "react";
import { useLocation } from 'react-router-dom';


function MoviesCard({ card, handleCardDelete, saveFavoriteMovie }) {
  const location = useLocation();
  const [isSaveMovie, setIsSaveMovie] = React.useState(false);

  function handleToggleButton() {
    setIsSaveMovie(!isSaveMovie)
    saveFavoriteMovie(card)
  }

  function showDurationHour(hour) {
    let time = `${Math.floor(hour/60)} ч.`
    if (time === "0 ч.") {
      return ``
    }
    return time;
  }

  function showDurationMin(min) {
    let time = `${min%60} мин.`
    if (time === "0 мин.") {
      return ``
    }
    return time;
  }

  return (
    <li className="moviesCard">
      <h2 className="moviesCard__title" title={card.nameRU}>{card.nameRU}</h2>
      <p className="moviesCard__diration">{`${showDurationHour(card.duration)} ${showDurationMin(card.duration)}`}</p>
      <a className="moviesCard__image-link" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="moviesCard__image" src={location.pathname === '/saved-movies' ? `${card.image}` : `https://api.nomoreparties.co${card.image.url}`} alt={card.description} />
      </a>
      {location.pathname === "/movies" ? (
        <button className={`moviesCard__button ${isSaveMovie ? "" : "moviesCard__button_active"}`} type="button" onClick={handleToggleButton}>{`${isSaveMovie ? "Сохранить" : ""}`}</button>
      ) : (
        <button className="moviesCard__button-delete" type="button" onClick={handleCardDelete}></button>
      )}
    </li>
  )
}

export default MoviesCard;
