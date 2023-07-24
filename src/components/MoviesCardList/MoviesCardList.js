import './MoviesCardList.css'
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList() {
  return (
    <>
      <section className="moviesCardList">
        < MoviesCard/>
      </section>

      <button className="moviesCardList__more" area-label="Ещё" type="submit">Ещё</button>
    </>
  )
}

export default MoviesCardList;
