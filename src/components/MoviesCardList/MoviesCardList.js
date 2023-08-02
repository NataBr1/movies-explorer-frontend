import './MoviesCardList.css'
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ movies }) {
  return (
    <>
      <section className="moviesCardList">
        <ul className="moviesCardList__list">
          {movies.map((card) => (
            <MoviesCard
              key={card.id}
              card={card}

            />
          ))}
        </ul>

      </section>
    </>
  )
}

export default MoviesCardList;
