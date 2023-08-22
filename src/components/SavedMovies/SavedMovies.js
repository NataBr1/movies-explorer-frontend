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
  //const [filtredMovies, setFiltredMovies] = React.useState(false);

  // Фильтруем сохраненные фильмы по длительности
  function filteredMyMoviesDur (favoriteMovie) {
    return favoriteMovie.filter((favoriteMovie) => favoriteMovie.duration <= SHORT_FILM)
  }

  // Выборка фильмов по ключевому слову
  function filteredMyMoviesVal(arrow, valueInSave) {
    const filtered = arrow.filter((favoriteFilm) => {
      return (
        favoriteFilm.nameRU.toLowerCase().includes(valueInSave.toLowerCase()) ||
        favoriteFilm.nameEN.toLowerCase().includes(valueInSave.toLowerCase())
      )
    })
    return filtered;
  }

  function handleFilteredMyMovies(arrow, valueInSave, checkBoxInSave) {
    const myMoviesList = filteredMyMoviesVal(arrow, valueInSave, checkBoxInSave);
    //setFiltredMovies(myMoviesList);
    setFavoriteMovies(checkBoxInSave ? filteredMyMoviesDur(myMoviesList) : myMoviesList);
    if (myMoviesList.length === 0) {
      setErrorMessageInSave("Ничего не найдено");
    } else {
      setErrorMessageInSave("");
    }
  }

  // Отображаем короткометражки, если есть, а если нет - сообщение
  function handleCheckBoxInSave() {
    setCheckBoxInSave(!checkBoxInSave);
    if (!checkBoxInSave) {
      if (filteredMyMoviesDur(favoriteMovies).length === 0) {
        setFavoriteMovies([])
        setErrorMessageInSave("Ничего не найдено")
      } else {
        setFavoriteMovies(filteredMyMoviesDur(favoriteMovies));
        setErrorMessageInSave("");
      }
    } else if (checkBoxInSave && valueInSave) {
      if (favoriteMovies.length === 0) {
        setErrorMessageInSave("Ничего не найдено")
      } else {
        setFavoriteMovies(filteredMyMoviesVal(arrow, valueInSave))
        setErrorMessageInSave("")
      }
    } else {
      setFavoriteMovies(arrow)
      setErrorMessageInSave("")
    }
  }

  function onSubmitSearchInSave(valueInSave) {
    handleFilteredMyMovies(arrow, valueInSave, checkBoxInSave)
  }

  return (
    <div className="savedMovies">

      <Header onClick={onClick} classNameHeader={"header"} />

      <main className="sticky-content">

        <PopupMenu isOpen={isOpen} onClose={onClose} />

        <SearchForm
          value={valueInSave}
          setValue={setValueInSave}
          onSubmitSearch={onSubmitSearchInSave}
          onFilterMovies={handleCheckBoxInSave}
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
