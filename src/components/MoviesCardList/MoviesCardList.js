import './MoviesCardList.css'
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import {
  SCREEN_L,
  SCREEN_M,
  SHOW_CARDS_FOR_L,
  SHOW_CARDS_FOR_M,
  SHOW_CARDS_FOR_S,
  PLUS_FOR_L,
  PLUS_FOR_MS
} from "../../utils/constants"


function MoviesCardList({
  movies,
  saveFavoriteMovie,
  deleteFavoriteMovie,
  favoriteMovies,
  searchMovies,
  isSavedMoviesPage
})

{
  const location = useLocation();
  const [showMovies, setShowMovies] = React.useState(0);

  function count() {
    const display = window.innerWidth;
    if (display > SCREEN_L) {
      setShowMovies(SHOW_CARDS_FOR_L);
    } else if (display > SCREEN_M) {
      setShowMovies(SHOW_CARDS_FOR_M);
    } else {
      setShowMovies(SHOW_CARDS_FOR_S);
    }
  }

  function showMore() {
    const display = window.innerWidth;
    if (display > SCREEN_L) {
      setShowMovies(showMovies + PLUS_FOR_L);
    } else if (display > SCREEN_M) {
      setShowMovies(showMovies + PLUS_FOR_MS);
    } else {
      setShowMovies(showMovies + PLUS_FOR_MS);
    }
  }

  React.useEffect(() => {
    count();
  }, [searchMovies]);

  React.useEffect(() => {
    window.addEventListener("resize", count);
    return () => {
      window.removeEventListener("resize", count);
    }
  }, []);



  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__list">
        {movies.slice(0, showMovies).map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              saveFavoriteMovie={saveFavoriteMovie}
              deleteFavoriteMovie={deleteFavoriteMovie}
              favoriteMovies={favoriteMovies}
              isSavedMoviesPage={isSavedMoviesPage} />
          )
        })}
      </ul>
      <div className="movies__button-box">
          {movies.length > showMovies && location.pathname === "/movies" ? (
            <button className="movies__more" type="button" onClick={showMore}>Ещё</button>
          ) : ("")}
        </div>

    </section>
  )
}

export default MoviesCardList;
