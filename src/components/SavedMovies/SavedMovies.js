import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css';
import React from "react";

function SavedMovies ({ isOpen, onClose, onClick, favoriteMovie }) {

  return (
    <div className="savedMovies">
      <Header onClick={onClick} classNameHeader={"header"} />
      <main className="sticky-content">
        <PopupMenu isOpen={isOpen} onClose={onClose} />
        <SearchForm showFilmList={[]} />
        <MoviesCardList movies={favoriteMovie} />
        <div className="savedMovies__box" />
      </main>
      <Footer />
    </div>

  );
};

export default SavedMovies ;
