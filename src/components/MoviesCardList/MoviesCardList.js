import './MoviesCardList.css'
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';


function MoviesCardList({ movies, saveFavoriteMovie, deleteFavoriteMovie, favoriteMovie }) {
  const location = useLocation();
  const [showMovies, setShowMovies] = React.useState(0);

  function count() {
    const display = window.innerWidth;
    if (display > 1024) {
      setShowMovies(12);
    } else if (display > 750) {
      setShowMovies(8);
    } else {
      setShowMovies(5);
    }
  }

  React.useEffect(() => {
    count();
    window.addEventListener("resize", count);
  }, []);

  function showMore() {
    const display = window.innerWidth;
    if (display > 1024) {
      setShowMovies(showMovies + 3);
    } else if (display > 750) {
      setShowMovies(showMovies + 2);
    } else {
      setShowMovies(showMovies + 2);
    }
  }

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__list">
        {location.pathname === "/movies" ? (
          movies.slice(0, showMovies).map((card) => {
          return (
            <MoviesCard
              key={card.id || card.movieId}
              card={card}
              saveFavoriteMovie={saveFavoriteMovie}
              deleteFavoriteMovie={deleteFavoriteMovie}
              favoriteMovie={favoriteMovie} />
          )
        })
        ) : (
            movies.map((card) => {
            return (
              <MoviesCard
                key={card.id || card.movieId}
                card={card}
                //saveFavoriteMovie={saveFavoriteMovie}
                deleteFavoriteMovie={deleteFavoriteMovie}
                favoriteMovie={favoriteMovie} />
            )})
        )}

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
