import './App.css';
import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Error from '../Error/Error';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

// import Preloader from '../Preloader/Preloader';

function App() {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [isPopupMenu, setIsPopupMenu] = React.useState(false);
  const [isPopupEditProfile, setIsPopupEditProfile] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [favoriteMovie, setFavoriteMovie] = React.useState([]);
  const [searchMovies, setSearchMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [value, setValue] = React.useState(''); //значение поля поиска фильма
  const [checkBox, setCheckBox] = React.useState(false); //Значение переключателя
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Получение информации по пользователе
  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        console.log(user)
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    }
  }, [loggedIn]);

  // Регистрация пользователя
  function handleRegister ({ name, email, password }) {
    setErrorMessage('')
    mainApi.register({ name, email, password })
      .then(() => {
        navigate("/signin", { replace: true });
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(`${err}`);
        if (err.includes(409)) {
          setErrorMessage("Пользователь с таким email уже зарегистрирован.")
        } else {
          setErrorMessage("Что-то пошло не так! Попробуйте еще раз.");
        }
      })
  }
  // Авторизация пользователя
  function handleLogin ({ email, password }) {
    setErrorMessage('')
    mainApi.authorize({ email, password })
      .then((user) => {
          localStorage.setItem('loggedIn', true);
          setLoggedIn(true);
          setCurrentUser(user);
          navigate("/movies", {replace: true});
      })
      .catch((err) => {
        console.log(`${err}`);
        if (err.includes(401)) {
          setErrorMessage("Неверный email или пароль! Попробуйте еще раз.")
        } else {
          setErrorMessage("Что-то пошло не так! Попробуйте еще раз.");
        }
      })
  }

  // Изменение данных о пользователе
  function handleUpdateUser(data) {
    setErrorMessage('')
    mainApi.setUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closePopup();
      })
      .catch((err) => {
        console.log(`${err}`);
        if (err.includes(409)) {
          setErrorMessage("Пользователь с таким email уже зарегистрирован.")
        } else {
          setErrorMessage("Что-то пошло не так! Попробуйте еще раз");
        }
      })
  }

  // Проверка токена
  React.useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      mainApi.checkToken()
        .then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
          navigate(path, {replace: true});
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    }
  }, []);

  // Выход из аккаунта
  function signOut() {
    localStorage.clear();
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('searchMovies');
    localStorage.removeItem('shortMovies');
    localStorage.removeItem('movies');
    localStorage.removeItem('allMovies');
    setLoggedIn(false);
    setCurrentUser({});
    setMovies([]);
    setFavoriteMovie([]);
    setSearchMovies([]);
    navigate('/');
  }

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
    return movies.filter((movie) => movie.duration <= 40);
  }

  function handleFilteredMovies(movies, value, checkBox) {
    const moviesList = filteredMoviesVal(movies, value, checkBox);
    setMovies(moviesList);
    setSearchMovies(checkBox ? filteredMoviesDur(moviesList) : moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }

  function handleCheckBox() {
    setCheckBox(!checkBox);
    if (!checkBox) {
      if (filteredMoviesDur(movies).length === 0) {
        setSearchMovies(filteredMoviesDur(movies));
      } else {
        setSearchMovies(filteredMoviesDur(movies));
      }
    } else {
      setSearchMovies(movies);
    }
    localStorage.setItem("shortMovies", !checkBox);
  }

  // Обработчик сабмита поиска фильмов
  function submitSearch(value) {
    localStorage.setItem("searchMovies", value);
    localStorage.setItem("shortMovies", checkBox);
    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      handleFilteredMovies(movies, value, checkBox);
    } else {
      setIsLoading(true);
      moviesApi.getMoviesList()
        .then((movies)=> {
          handleFilteredMovies(movies, value, checkBox);
          console.log(movies)
        })
        .catch((err) => {
          console.log(`${err}`);
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  // Получение фильмов из localStorage
  React.useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setMovies(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setSearchMovies(filteredMoviesDur(movies));
      } else {
        setSearchMovies(movies);
      }
    }
  }, []);

  // Получение короткомеражек из localStorage
  React.useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setCheckBox(true);
    } else {
      setCheckBox(false);
    }
  }, []);

  // Вывод сообщения об ошибке поиска фильма
  React.useEffect(() => {
    if (localStorage.getItem("searchMovies" && location.pathname === "/movies")) {
      if (searchMovies.length === 0) {
        setErrorMessage("Ничего не найдено");
      } else {
        setErrorMessage("");
      }
    }
  }, []);

  // Сохранение фильма в избранные
  function saveFavoriteMovie(movie) {
    mainApi.addCard(movie)
      .then((data) => {
        setFavoriteMovie([data, ...favoriteMovie])
        console.log(data)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
    }

  // Получение списка сохраненных фильмов
  function getFavoriteMovies() {
    mainApi.getFavoriteMovies()
      .then((data)=> {
        setFavoriteMovie(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  React.useEffect(() => {
    getFavoriteMovies()
  }, [])

  // Удаление фильма из избранных
  function handleCardDelete(card) {
    const savedCard = favoriteMovie.find((item) => item.movieId === card.id || item.movieId === card.movieId);
    mainApi.deleteCard(savedCard._id)
      .then(() => {
        setFavoriteMovie((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  // Управление попапами
  function handlePopupMenuClick() {
    setIsPopupMenu(true)
  }
  function handlePopupEditProfile() {
    setIsPopupEditProfile(true)
  }
  function closePopup() {
    setIsPopupMenu(false)
    setIsPopupEditProfile(false)
    setIsInfoTooltipOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Routes>

          <Route path="/" element={
            <Main loggedIn={loggedIn} isOpen={isPopupMenu} onClose={closePopup}/>
          } />

          <Route path="/movies" element={
            <ProtectedRoute element={Movies}
              loggedIn={loggedIn}
              isLoading={isLoading}
              onClick={handlePopupMenuClick}
              isOpen={isPopupMenu}
              onClose={closePopup}
              value={value}
              setValue={setValue}
              onSubmitSearch={submitSearch}
              onFilterMovies={handleCheckBox}
              checkBox={checkBox}
              setCheckBox={setCheckBox}
              searchMovies={searchMovies}
              saveFavoriteMovie={saveFavoriteMovie}
              deleteFavoriteMovie={handleCardDelete}
              errorMessage={errorMessage} />
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute element={SavedMovies}
              loggedIn={loggedIn}
              onClick={handlePopupMenuClick}
              isOpen={isPopupMenu}
              onClose={closePopup}
              value={value}
              setValue={setValue}
              //onSubmitSearch={submitSearchMyFilm}
              checkBox={checkBox}
              setCheckBox={setCheckBox}
              movies={favoriteMovie}
              deleteFavoriteMovie={handleCardDelete}
              />
          } />

          <Route path="/profile" element={
            <ProtectedRoute element={Profile}
              loggedIn={loggedIn}
              isOpenEditProfile={isPopupEditProfile}
              onCloseEditProfile={closePopup}
              onClickEditProfile={handlePopupEditProfile}
              onUpdateUser={handleUpdateUser}
              isOpen={isPopupMenu}
              onClick={handlePopupMenuClick}
              errorMessage={errorMessage}
              signOut={signOut} />
            }/>

          <Route path="/signin" element={
            <Login
              handleLogin={handleLogin}
              errorMessage={errorMessage} />
          } />

          <Route path="/signup" element={
            <Register
              handleRegister={handleRegister}
              errorMessage={errorMessage} />
          } />

          <Route path="*" element={
            <Error />
          } />

        </Routes>

        <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closePopup}
        />

      </div>
    </CurrentUserContext.Provider>
  );

};

export default App;
