import './MoviesCardList.css'
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList() {
  return (
    <>
      <section className="moviesCardList">
        <ul className="moviesCardList__list">
          <MoviesCard/>
        </ul>

      </section>
    </>
  )
}

export default MoviesCardList;
