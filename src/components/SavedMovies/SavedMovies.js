import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css';
import React from "react";

function SavedMovies ({ isOpen, onClose, onClick }) {

  return (
    <main className="savedMovies">
      <div className="sticky__content">
        <PopupMenu isOpen={isOpen} onClose={onClose} />
        <Header onClick={onClick} />
        <SearchForm />
        <MoviesCardList />
        <div className="savedMovies__box" />
      </div>
      <div className="sticky__footer">
        <Footer />
      </div>

    </main>

  );
};

export default SavedMovies ;
