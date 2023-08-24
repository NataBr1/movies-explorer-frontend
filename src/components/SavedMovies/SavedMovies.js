import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import './SavedMovies.css';
import React from "react";
import { filteredMoviesDur, filterMoviesVal } from '../../utils/filtredMovies';
import { useLocation } from 'react-router-dom';


function SavedMovies ({
  onClick,
  isOpen,
  onClose,
  deleteFavoriteMovie,
  getFavoriteMovies,
  errorMessage,
  setErrorMessage,
  favoriteMovies,
  setFavoriteMovies,
  isSavedMoviesPage,
  rawFaforiteMovies,
  setRawFaforiteMovies
})

{
  const location = useLocation();
  const [valueInSave, setValueInSave] = React.useState(''); //значение поля поиска фильма на странице сохраненных фильмов
  const [checkBoxInSave, setCheckBoxInSave] = React.useState(false); //Значение переключателя на странице сохраненных фильмах
  const [rawFavoriteMovies, setRawFavoriteMovies] = React.useState(favoriteMovies);
  const [searchFavoriteMovies, setSearchFavoriteMovies] = React.useState([]);


  function handleSubmitSearch(valueInSave) {
      const filterMoviesList = filterMoviesVal(rawFavoriteMovies, valueInSave, checkBoxInSave)
      if (filterMoviesList.length === 0) {
          setErrorMessage("Ничего не найдено")
          setSearchFavoriteMovies([])
      } else {
          setSearchFavoriteMovies(filterMoviesList)
          setErrorMessage("")
      }
      setRawFavoriteMovies(filterMoviesList)
  }

  function handleShortMovies() {
      if (!checkBoxInSave) {
          setCheckBoxInSave(true)
          setSearchFavoriteMovies(filteredMoviesDur(favoriteMovies))
          // if (filteredMoviesDur(searchFavoriteMovies).length === 0) {
          //   setErrorMessage("Ничего не найдено")
          //   setSearchFavoriteMovies([])
          // } else {
          //   setErrorMessage("")
          // }
      } else {
          setCheckBoxInSave(false)
          setSearchFavoriteMovies(favoriteMovies)
          // if (searchFavoriteMovies.length === 0) {
          //   setErrorMessage("Ничего не найдено")
          // } else {
          //   setErrorMessage("")
          // }
      }
  }

  React.useEffect(() => {
      setSearchFavoriteMovies(favoriteMovies)
      if (favoriteMovies.length === 0) {
        setErrorMessage("Ничего не найдено")
      } else {
        setErrorMessage("")
      }
  }, [favoriteMovies, location.pathname])


  return (
    <div className="savedMovies">

      <Header onClick={onClick} classNameHeader={"header"} />

      <main className="sticky-content">

        <PopupMenu isOpen={isOpen} onClose={onClose} />

        <SearchForm
          value={valueInSave}
          setValue={setValueInSave}
          onSubmitSearch={handleSubmitSearch}
          onFilterMovies={handleShortMovies}
          checkBox={checkBoxInSave}
          setCheckBox={setCheckBoxInSave}
          getFavoriteMovies={getFavoriteMovies}
          setRawFavoriteMovies={setRawFavoriteMovies}
          favoriteMovies={favoriteMovies} />

        {(errorMessage ? (<p className="search__error">{errorMessage}</p>) : "")}

        {errorMessage ? "" :
          <MoviesCardList
            movies={searchFavoriteMovies}
            deleteFavoriteMovie={deleteFavoriteMovie}
            favoriteMovies={favoriteMovies}
            isSavedMoviesPage={true}
            searchMovies={searchFavoriteMovies}
             />
        }

        <div className="savedMovies__box" />

      </main>

      <Footer />

    </div>

  )
}

export default SavedMovies;
