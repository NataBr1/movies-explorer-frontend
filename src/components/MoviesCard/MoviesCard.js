import './MoviesCard.css'
import React from "react";
import { useLocation } from 'react-router-dom';


function MoviesCard({ card, saveFavoriteMovie, deleteFavoriteMovie }) {
  const location = useLocation();
  const [isSaveMovie, setIsSaveMovie] = React.useState(false);

  function saveMovie() {
    saveFavoriteMovie(card)
    setIsSaveMovie(true)
  }

  function deleteMovie() {
    deleteFavoriteMovie(card)
    setIsSaveMovie(false)
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
        <img className="moviesCard__image" src={location.pathname === '/saved-movies' ? card.image : `https://api.nomoreparties.co${card.image.url}`} alt={card.description} />
      </a>
      {location.pathname === "/movies" && !isSaveMovie && (
        <button className="moviesCard__button" type="button" onClick={saveMovie}>Сохранить</button>
      )}
      {location.pathname === "/movies" && isSaveMovie && (
        <button className="moviesCard__button_active" type="button" onClick={deleteMovie}></button>
      )}
      {location.pathname === "/saved-movies" && (
        <button className="moviesCard__button-delete" type="button" onClick={deleteMovie}></button>
      )}
    </li>
  )
}

export default MoviesCard;
