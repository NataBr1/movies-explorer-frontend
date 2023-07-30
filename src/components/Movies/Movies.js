import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PopupMenu from "../PopupMenu/PopupMenu";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import React from "react";

function Movies({ isOpen, onClose, onClick }) {

  return (
    <div className="movies">
      <Header onClick={onClick} />
      <main className="sticky-content">
        <PopupMenu isOpen={isOpen} onClose={onClose} />
        <SearchForm />
        <MoviesCardList />
        <div className="movies__button-box">
          <button className="movies__more" type="button">Ещё</button>
        </div>
      </main>
      <Footer />
    </div>

  );
};

export default Movies;
