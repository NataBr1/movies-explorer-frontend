import './MoviesCardList.css'
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ movies, handleCardDelete, saveFavoriteMovie }) {

  return (
    <>
      <section className="moviesCardList">
        <ul className="moviesCardList__list">
          {movies.map((card) => (
            <MoviesCard
              key={card.id || card.movieId}
              card={card}
              handleCardDelete={handleCardDelete}
              saveFavoriteMovie={saveFavoriteMovie}
            />
          ))}
        </ul>

      </section>
    </>
  )
}

export default MoviesCardList;
