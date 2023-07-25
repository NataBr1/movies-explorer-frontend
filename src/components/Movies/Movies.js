import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PopupMenu from "../PopupMenu/PopupMenu";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import React from "react";

function Movies({ isOpen, onClose, onClick }) {

  return (
    <section className="movies">
      <PopupMenu isOpen={isOpen} onClose={onClose} />
      <Header onClick={onClick} />
      <SearchForm />
      <MoviesCardList />
      <button className="movies__more" area-label="Ещё" type="submit">Ещё</button>
      <Footer />

    </section>

  );
};

export default Movies;
