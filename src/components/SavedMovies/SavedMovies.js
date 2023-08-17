import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css';
import React from "react";


function SavedMovies ({
  onClick,
  isOpen,
  onClose,
  value,
  setValue,
  onSubmitSearch,
  onFilterMovies,
  checkBox,
  setCheckBox,
  movies,
  deleteFavoriteMovie,
  favoriteMovie,
  getFavoriteMovies,
  errorMessage
})

{
  return (
    <div className="savedMovies">

      <Header onClick={onClick} classNameHeader={"header"} />

      <main className="sticky-content">

        <PopupMenu isOpen={isOpen} onClose={onClose} />

        <SearchForm
          value={value}
          setValue={setValue}
          onSubmitSearch={onSubmitSearch}
          onFilterMovies={onFilterMovies}
          checkBox={checkBox}
          setCheckBox={setCheckBox}
          getFavoriteMovies={getFavoriteMovies} />

        {errorMessage ? (<p className="search__error">{errorMessage}</p>) : ""}

        <MoviesCardList
          movies={movies}
          deleteFavoriteMovie={deleteFavoriteMovie}
          favoriteMovie={favoriteMovie} />

        <div className="savedMovies__box" />

      </main>

      <Footer />

    </div>

  );
};

export default SavedMovies ;
