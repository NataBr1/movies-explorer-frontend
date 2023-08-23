import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import './SavedMovies.css';
import React from "react";
import { filteredMoviesDur, filterMoviesVal } from '../../utils/filtredMovies';


function SavedMovies ({
  onClick,
  isOpen,
  onClose,
  deleteFavoriteMovie,
  getFavoriteMovies,
  errorMessage,
  setErrorMessage,
  isLoading,
  favoriteMovies,
  setFavoriteMovies,
  isSavedMoviesPage,
  rawFaforiteMovies,
  setRawFaforiteMovies
})

{
  const [valueInSave, setValueInSave] = React.useState(''); //значение поля поиска фильма на странице сохраненных фильмов
  const [checkBoxInSave, setCheckBoxInSave] = React.useState(false); //Значение переключателя на странице сохраненных фильмах



  return (
    <div className="savedMovies">

      <Header onClick={onClick} classNameHeader={"header"} />

      <main className="sticky-content">

        <PopupMenu isOpen={isOpen} onClose={onClose} />

        <SearchForm
          value={valueInSave}
          setValue={setValueInSave}
          // onSubmitSearch={handleSubmitSearch}
          // onFilterMovies={handleShortMovies}
          checkBox={checkBoxInSave}
          setCheckBox={setCheckBoxInSave}
          getFavoriteMovies={getFavoriteMovies}
          isLoading={isLoading}
          favoriteMovies={favoriteMovies} />

        {isLoading ? <Preloader /> : ""}
        {isLoading ? "" :
          (errorMessage ? (<p className="search__error">{errorMessage}</p>) : "")
        }

        {isLoading ? "" :
          <MoviesCardList
            movies={favoriteMovies}
            deleteFavoriteMovie={deleteFavoriteMovie}
            favoriteMovies={favoriteMovies}
            isSavedMoviesPage={true} />
        }

        <div className="savedMovies__box" />

      </main>

      <Footer />

    </div>

  )
}

export default SavedMovies;
