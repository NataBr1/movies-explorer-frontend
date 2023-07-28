import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css';
import React from "react";

function SavedMovies ({ isOpen, onClose, onClick }) {

  return (
    <div className="savedMovies">
      <Header onClick={onClick} />
      <main className="sticky__content">
        <PopupMenu isOpen={isOpen} onClose={onClose} />
        <SearchForm />
        <MoviesCardList />
        <div className="savedMovies__box" />
      </main>
      <Footer />
    </div>

  );
};

export default SavedMovies ;
