import './MoviesCardList.css'
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList() {
  return (
    <>
      <section className="moviesCardList">
        < MoviesCard/>
      </section>
    </>
  )
}

export default MoviesCardList;
