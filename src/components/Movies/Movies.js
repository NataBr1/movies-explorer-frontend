import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PopupMenu from "../PopupMenu/PopupMenu";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import React from "react";

function Movies({
  isLoading,
  onClick,
  isOpen,
  onClose,
  value,
  setValue,
  onSubmitSearch,
  onFilterMovies,
  checkBox,
  setCheckBox,
  searchMovies,
  saveFavoriteMovie,
  deleteFavoriteMovie,
  errorMessage
})

{


  return (
    <div className="movies">

      <Header onClick={onClick} classNameHeader={"header"} />

      <main className="sticky-content">

        <PopupMenu isOpen={isOpen} onClose={onClose} />

        <SearchForm
          value={value}
          setValue={setValue}
          onSubmitSearch={onSubmitSearch}
          onFilterMovies={onFilterMovies}
          checkBox={checkBox}
          setCheckBox={setCheckBox} />

        {isLoading ? <Preloader /> : ""}
        {errorMessage ? (<p className="search__error">{errorMessage}</p>) : ""}

        <MoviesCardList
          movies={searchMovies}
          saveFavoriteMovie={saveFavoriteMovie}
          deleteFavoriteMovie={deleteFavoriteMovie} />



      </main>

      <Footer />

    </div>

  );
};

export default Movies;
