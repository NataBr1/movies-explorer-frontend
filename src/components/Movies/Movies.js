import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PopupMenu from "../PopupMenu/PopupMenu";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import React from "react";

function Movies({ isOpen, onClose, onClick, movies, showFilmList, isLoading, showFavoriteMovies }) {

  return (
    <div className="movies">
      <Header onClick={onClick} classNameHeader={"header"} />
      <main className="sticky-content">
        <PopupMenu isOpen={isOpen} />
        <SearchForm showFilmList={showFilmList} />
        <MoviesCardList movies={movies} />
        {isLoading ? <Preloader /> : ""}
        <div className="movies__button-box">
          <button className="movies__more" type="button">Ещё</button>
        </div>
      </main>
      <Footer />
    </div>

  );
};

export default Movies;
