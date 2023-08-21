import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PopupMenu from "../PopupMenu/PopupMenu";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import React from "react";
import { SHORT_FILM } from "../../utils/constants"
import moviesApi from '../../utils/MoviesApi';

function Movies({
  movies,
  favoriteMovies,
  isLoading,
  onClick,
  isOpen,
  onClose,
  saveFavoriteMovie,
  deleteFavoriteMovie,
  errorMessage,
  setErrorMessage,
  setMovies,
  setIsLoading,
  searchMovies,
  setSearchMovies
})

{
  //const location = useLocation();
  const [value, setValue] = React.useState(''); //значение поля поиска фильма
  const [checkBox, setCheckBox] = React.useState(false); //Значение переключателя

  // Выборка фильмов по ключевому слову
  function filteredMoviesVal(movies, value) {
    const filtered = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(value.toLowerCase())
      )
    })
      return filtered;
    }

    // Выборка фильмов по чекбоксу
    function filteredMoviesDur(movies) {
      return movies.filter((movie) => movie.duration <= SHORT_FILM);
    }

    // Функция поиска
    function handleFilteredMovies(movies, value, checkBox) {
      const moviesList = filteredMoviesVal(movies, value, checkBox);
      setMovies(moviesList);
      setSearchMovies(checkBox ? filteredMoviesDur(moviesList) : moviesList);
      localStorage.setItem("foundMovies", JSON.stringify(moviesList));
      if (moviesList.length === 0) {
        setErrorMessage("Ничего не найдено");
        localStorage.setItem("mesNotFound", "true");
      } else {
        setErrorMessage("");
        localStorage.setItem("mesNotFound", "false");
      }
    }

    // Отображение фильмов или сообщения об их отсутствии
    function handleCheckBox() {
      setCheckBox(!checkBox);
      if (!checkBox && value) {
        if (filteredMoviesDur(movies).length === 0) {
          setSearchMovies([]);
          setErrorMessage("Ничего не найдено");
          localStorage.setItem("mesNotFound", "true");
        } else {
          setSearchMovies(filteredMoviesDur(movies));
          localStorage.setItem("mesNotFound", "false");
        }
      } else if (!value && checkBox) {
          setSearchMovies([]);
          localStorage.setItem("foundMovies", []);
          setErrorMessage("Ничего не найдено");
          localStorage.setItem("mesNotFound", "true");
      } else if (!value && !checkBox) {
          setSearchMovies([]);
          localStorage.setItem("foundMovies", []);
          setErrorMessage("Ничего не найдено");
          localStorage.setItem("mesNotFound", "true");
      } else {
        setSearchMovies(movies);
        setErrorMessage("")
        localStorage.setItem("mesNotFound", "false");
      }
      localStorage.setItem("switchStatus", !checkBox);
    }

    // Обработчик сабмита поиска фильмов
    function onSubmitSearch(value) {
      setErrorMessage("");
      localStorage.setItem("request", value); //сохраняем текст запроса
      localStorage.setItem("switchStatus", checkBox); // сохраняем статус чекбокса
      if (localStorage.getItem("allMovies")) { // если уже есть список всех фильмов, возьмем оттуда
        const allMovies = JSON.parse(localStorage.getItem("allMovies"));
        handleFilteredMovies(allMovies, value, checkBox);
      } else { // или включаем прелоадер и тянем все фильмы с апи и сохраняем в localStorage
        setIsLoading(true);
        moviesApi.getMoviesList()
          .then((allMovies)=> {
            handleFilteredMovies(allMovies, value, checkBox);
            localStorage.setItem("allMovies", JSON.stringify(allMovies));
          })
          .catch((err) => {
            setErrorMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
            console.log(`${err}`);
          })
          .finally(() => {
            setIsLoading(false)
          })
        }
      }

    React.useEffect(() => {
      if (localStorage.getItem("mesNotFound") === "true") {
        setErrorMessage("Ничего не найдено");
      } else {
        setErrorMessage("");
      }
    }, []);


    // Получение фильмов из localStorage
    React.useEffect(() => {
      if (localStorage.getItem("foundMovies")) {
        const movies = JSON.parse(localStorage.getItem("foundMovies" || []));
        setMovies(movies);
        if (localStorage.getItem("switchStatus") === "true") {
          setSearchMovies(filteredMoviesDur(movies));
        } else {
          setSearchMovies(movies);
        }
      }
    }, []);

    // Достаем из localStorage значение чекбокса
    React.useEffect(() => {
      if (localStorage.getItem("switchStatus") === "true") {
        setCheckBox(true);
      } else {
        setCheckBox(false);
      }
    }, []);

    // Достаем из localStorage значение инпута поиска фильма
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
          onSubmitSearch={onSubmitSearch}
          onFilterMovies={handleCheckBox}
          checkBox={checkBox}
          setCheckBox={setCheckBox}
          isLoading={isLoading}
          setSearchMovies={setSearchMovies}/>

        {isLoading ? <Preloader /> : ""}
        {isLoading ? "" :
          (errorMessage ? (<p className="search__error">{errorMessage}</p>) : "")
        }


        {isLoading ? "" :
          <MoviesCardList
            movies={searchMovies}
            saveFavoriteMovie={saveFavoriteMovie}
            deleteFavoriteMovie={deleteFavoriteMovie}
            favoriteMovies={favoriteMovies}
            searchMovies={searchMovies} />
        }


      </main>

      <Footer />

    </div>

  );
};

export default Movies;
