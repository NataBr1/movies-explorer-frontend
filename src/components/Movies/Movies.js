import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PopupMenu from "../PopupMenu/PopupMenu";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import React from "react";

function Movies({ isOpen, onClose, onClick }) {

  return (
    <main className="movies">
      <div className="sticky__content">
        <PopupMenu isOpen={isOpen} onClose={onClose} />
        <Header onClick={onClick} />
        <SearchForm />
        <MoviesCardList />
        <div className="movies__button-box">
          <button className="movies__more" type="button">Ещё</button>
        </div>
      </div>
      <div className="sticky__footer">

        <Footer />
      </div>
    </main>

  );
};

export default Movies;
