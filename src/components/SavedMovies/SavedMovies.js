import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
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
  favoriteMovie,
  deleteFavoriteMovie,
  getFavoriteMovies,
  errorMessage,
  isLoading
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
          getFavoriteMovies={getFavoriteMovies}
          isLoading={isLoading} />

        {isLoading ? <Preloader /> : ""}
        {isLoading ? "" :
          (errorMessage ? (<p className="search__error">{errorMessage}</p>) : "")
        }

        {isLoading ? "" :
          <MoviesCardList
            movies={favoriteMovie}
            deleteFavoriteMovie={deleteFavoriteMovie}
            favoriteMovie={favoriteMovie} />
        }

        <div className="savedMovies__box" />

      </main>

      <Footer />

    </div>

  );
};

export default SavedMovies ;
