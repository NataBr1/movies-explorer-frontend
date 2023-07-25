import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import img from '../../images/pic__COLOR_pic.png';
import './SavedMovies.css';
import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies ({ isOpen, onClose, onClick }) {

  return (
    <section className="savedMovies">
      <PopupMenu isOpen={isOpen} onClose={onClose} />
      <Header onClick={onClick} />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>

  );
};

export default SavedMovies ;
