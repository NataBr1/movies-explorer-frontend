import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PopupMenu from "../PopupMenu/PopupMenu";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import React from "react";

function Movies({ isPopupMenu, closePopup, handlePopupMenuClick }) {

  return (
    <section className="movies">
      <PopupMenu isOpen={isPopupMenu} onClose={closePopup} />
      <Header onOpenPopupMenu={handlePopupMenuClick} />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>

  );
};

export default Movies;
