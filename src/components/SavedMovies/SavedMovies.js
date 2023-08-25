import PopupMenu from "../PopupMenu/PopupMenu";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import './SavedMovies.css';
import React from "react";
import { filterMoviesDur, filterMoviesVal } from '../../utils/filtredMovies';


function SavedMovies ({
  onClick,
  isOpen,
  onClose,
  deleteFavoriteMovie,
  getFavoriteMovies,
  errorMessage,
  setErrorMessage,
  favoriteMovies
})

{
  const [valueInSave, setValueInSave] = React.useState(''); //значение поля поиска фильма на странице сохраненных фильмов
  const [checkBoxInSave, setCheckBoxInSave] = React.useState(false); //Значение переключателя на странице сохраненных фильмах
  const [filteredMovies, setFilteredMovies] = React.useState(favoriteMovies);


  function handleSubmitSearch(valueInSave) {
    setValueInSave(valueInSave);
  }

  function handleShortMovies() {
    setCheckBoxInSave(!checkBoxInSave);
  }

  React.useEffect(() => {
    const moviesList = filterMoviesVal(favoriteMovies, valueInSave);
    setFilteredMovies(checkBoxInSave ? filterMoviesDur(moviesList) : moviesList);
  }, [favoriteMovies, checkBoxInSave, valueInSave]);

  React.useEffect(() => {
    if (filteredMovies.length === 0) {
      setErrorMessage("Ничего не найдено")
    } else {
      setErrorMessage("")
    }
  }, [filteredMovies]);


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
          favoriteMovies={favoriteMovies} />

        {(errorMessage ? (<p className="search__error">{errorMessage}</p>) : "")}

        {errorMessage ? "" :
          <MoviesCardList
            movies={filteredMovies}
            deleteFavoriteMovie={deleteFavoriteMovie}
            favoriteMovies={favoriteMovies}
            isSavedMoviesPage={true}
            searchMovies={filteredMovies}
             />
        }

        <div className="savedMovies__box" />

      </main>

      <Footer />

    </div>

  )
}

export default SavedMovies;
