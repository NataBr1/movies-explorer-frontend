import './MoviesCard.css'
import React from "react";
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { apiMovieImg } from "../../utils/constants";

function MoviesCard({ movie, saveFavoriteMovie, deleteFavoriteMovie, favoriteMovie, isLoading }) {
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  const [isSaveMovie, setIsSaveMovie] = React.useState(false);

  const markedMovie = favoriteMovie.find(
    (item) => item.nameEN === movie.nameEN && item.owner === currentUser._id
  );

  function onClick() {
    if(!isSaveMovie) {
      saveFavoriteMovie(movie)
    } else {
      const searchMovie = favoriteMovie.find(
        (item) => item.movieId === movie.id
      );
      deleteFavoriteMovie(searchMovie)
      setIsSaveMovie(false)
    }
  }

  function deleteMovie() {
    deleteFavoriteMovie(movie)
  }

  React.useEffect(() => {
    if (markedMovie) {
      setIsSaveMovie(true);
    }
  }, [markedMovie]);

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
      <h2 className="moviesCard__title" title={movie.nameRU}>{movie.nameRU}</h2>
      <p className="moviesCard__diration">{`${showDurationHour(movie.duration)} ${showDurationMin(movie.duration)}`}</p>
      <a className="moviesCard__image-link" href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="moviesCard__image" src={location.pathname === '/saved-movies' ? movie.image : `${apiMovieImg}${movie.image.url}`} alt={movie.description} />
      </a>

    {/* Пока не опредилась как лучше написать, и так и так красиво */}
      {
        location.pathname === "/saved-movies"
          ? <button className="moviesCard__button-delete" type="button" onClick={deleteMovie}></button>
          : isSaveMovie
            ? <button className="moviesCard__button_active" type="button" onClick={onClick}></button>
            : <button className="moviesCard__button" type="button" onClick={onClick}>Сохранить</button>
      }

      {/* {location.pathname === "/movies" && !isSaveMovie && (
        <button className="moviesCard__button" type="button" onClick={saveMovie}>Сохранить</button>
      )}
      {location.pathname === "/movies" && isSaveMovie && (
        <button className="moviesCard__button_active" type="button" onClick={deleteMovie}></button>
      )}
      {location.pathname === "/saved-movies" && (
        <button className="moviesCard__button-delete" type="button" onClick={deleteMovie}></button>
      )} */}
    </li>
  )
}

export default MoviesCard;
