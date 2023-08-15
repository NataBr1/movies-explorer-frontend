import './MoviesCardList.css'
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ movies, handleCardDelete, saveFavoriteMovie, count }) {

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__list">
        {movies.map((card, index) =>
          index + 1 <= count ? (
            <MoviesCard
              key={card._id || card.id}
              card={card}
              handleCardDelete={handleCardDelete}
              saveFavoriteMovie={saveFavoriteMovie}
            />
        ) : (""))}
      </ul>

    </section>
  )
}

export default MoviesCardList;
