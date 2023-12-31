import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PopupMenu from "../PopupMenu/PopupMenu";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import React from "react";
import moviesApi from '../../utils/MoviesApi';
import { filterMoviesDur, filterMoviesVal } from '../../utils/filtredMovies';

function Movies({
  favoriteMovies,
  isLoading,
  onClick,
  isOpen,
  onClose,
  saveFavoriteMovie,
  deleteFavoriteMovie,
  errorMessage,
  setErrorMessage,
  setIsLoading,
  shortMovies,
  setAllMovies
})

{
  const [error, setError] = React.useState('')
  const [value, setValue] = React.useState('');
  const [checkBox, setCheckBox] = React.useState(false);
  const [rawMovies, setRawMovies] = React.useState(JSON.parse(localStorage.getItem('allMovies')));
  const [searchMovies, setSearchMovies] = React.useState([]);

  function handleFilterMovies(movies, value, checkbox) {
      const moviesList = filterMoviesVal(movies, value, checkbox)
      if (moviesList.length === 0) {
          setErrorMessage("Ничего не найдено")
      } else {
          setErrorMessage("")
      }
      setRawMovies(moviesList);
      setSearchMovies(checkbox ? filterMoviesDur(moviesList) : moviesList);
      localStorage.setItem('findedMovies', JSON.stringify(moviesList))
      localStorage.setItem('findedShortMovies', JSON.stringify(filterMoviesDur(moviesList)))
  }

  function handleSubmitSearch(value) {
      setValue(value);
      localStorage.setItem('request', value);
      localStorage.setItem('checkBoxStatus', checkBox);
      if (localStorage.getItem('allMovies')) {
          const allMoviesList = JSON.parse(localStorage.getItem('allMovies'))
          handleFilterMovies(allMoviesList, value, checkBox)
      } else {
          setIsLoading(true)
          moviesApi.getMoviesList()
            .then((allMovies) => {
                setAllMovies(allMovies)
                localStorage.setItem('allMovies', JSON.stringify(allMovies))
                handleFilterMovies(allMovies, value, checkBox)
            })
            .catch((err) => {
              setErrorMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
              console.log(`${err}`);
            })
            .finally(() => {
              setIsLoading(false);
            })
      }
  }

  function handleShortMovies() {
    setCheckBox(!checkBox)
      if (!checkBox) {
          setSearchMovies(filterMoviesDur(rawMovies))
      } else {
          setSearchMovies(rawMovies)
      }
      localStorage.setItem('checkBoxStatus', !checkBox);
  }

  React.useEffect(() => {
      if (localStorage.getItem('findedMovies')) {
          const movies = JSON.parse(localStorage.getItem('findedMovies'))
          setRawMovies(movies)
          if (localStorage.getItem('checkBoxStatus') === true) {
              setSearchMovies(filterMoviesDur(movies))
          } else {
              setSearchMovies(movies)
          }
      }

  }, [])

  React.useEffect(() => {
      if ((localStorage.getItem('checkBoxStatus') === true) && (localStorage.getItem('findedShortMovies'))) {
        setErrorMessage("Ничего не найдено")
      } else if ((localStorage.getItem('checkBoxStatus') === false) && (localStorage.getItem('findedMovies'))) {
        setErrorMessage("Ничего не найдено")
      } else {
        setErrorMessage("")
      }
  }, [])

  React.useEffect(() => {
      if (localStorage.getItem('checkBoxStatus') === 'true') {
          setCheckBox(true)
          if (localStorage.getItem('findedShortMovies')) {
              const shortMovies = JSON.parse(localStorage.getItem('findedShortMovies'))
              setSearchMovies(shortMovies)
          }
      } else {
          setCheckBox(false)
      }
  }, [])

  React.useEffect(() => {
    if (localStorage.getItem("request")) {
      const dataValue = JSON.stringify(localStorage.getItem("request"));
      setValue(dataValue.replace(/\"/g, ""));
    }
  }, []);


  return (
    <div className="movies">

      <Header onClick={onClick} classNameHeader={"header"} />

      <main className="sticky-content">

        <PopupMenu isOpen={isOpen} onClose={onClose} />

        <SearchForm
          value={value}
          setValue={setValue}
          onSubmitSearch={handleSubmitSearch}
          onFilterMovies={handleShortMovies}
          checkBox={checkBox}
          setCheckBox={setCheckBox}
          isLoading={isLoading}
          setSearchMovies={setSearchMovies}
          isShortMovies={shortMovies}
          error={error}
          setError={setError}
          setErrorMessage={setErrorMessage}/>

        {isLoading ? <Preloader /> : ""}
        {isLoading ? "" :
          (errorMessage ? (<p className="search__error">{errorMessage}</p>) : "")
        }


        {isLoading || errorMessage || error ? "" :
          <MoviesCardList
            movies={searchMovies}
            saveFavoriteMovie={saveFavoriteMovie}
            deleteFavoriteMovie={deleteFavoriteMovie}
            favoriteMovies={favoriteMovies}
            searchMovies={searchMovies}
            isSavedMoviesPage={false} />
        }


      </main>

      <Footer />

    </div>

  );
};

export default Movies;
