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
  checkBox,
  setCheckBox,
  movies,
  saveFavoriteMovie,
  filteredMovies
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
          checkBox={checkBox}
          setCheckBox={setCheckBox} />

        <MoviesCardList
          movies={movies}
          saveFavoriteMovie={saveFavoriteMovie}
          filteredMovies={filteredMovies} />

        {isLoading ? <Preloader /> : ""}

        <div className="movies__button-box">
          <button className="movies__more" type="button">Ещё</button>
        </div>

      </main>

      <Footer />

    </div>

  );
};

export default Movies;
