import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import './SavedMovies.css';
import React from "react";
import { SHORT_FILM } from "../../utils/constants"


function SavedMovies ({
  onClick,
  isOpen,
  onClose,
  deleteFavoriteMovie,
  getFavoriteMovies,
  errorMessage,
  isLoading,
  favoriteMovies,
  setFavoriteMovies,
  setErrorMessageInSave,
  arrow
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
          // onSubmitSearch={onSubmitSearchInSave}
          // onFilterMovies={handleCheckBoxInSave}
          checkBox={checkBoxInSave}
          setCheckBox={setCheckBoxInSave}
          getFavoriteMovies={getFavoriteMovies}
          isLoading={isLoading} />

        {isLoading ? <Preloader /> : ""}
        {isLoading ? "" :
          (errorMessage ? (<p className="search__error">{errorMessage}</p>) : "")
        }

        {isLoading ? "" :
          <MoviesCardList
            movies={favoriteMovies}
            deleteFavoriteMovie={deleteFavoriteMovie}
            favoriteMovies={favoriteMovies} />
        }

        <div className="savedMovies__box" />

      </main>

      <Footer />

    </div>

  )
}

export default SavedMovies;
