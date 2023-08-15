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
// import { func } from 'prop-types';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// import Preloader from '../Preloader/Preloader';

function App() {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [isPopupMenu, setIsPopupMenu] = React.useState(false);
  const [isPopupEditProfile, setIsPopupEditProfile] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [favoriteMovie, setFavoriteMovie] = React.useState([]);
  const [searchMovies, setSearchMovies] = React.useState([]);
  const [shortMovies, setShortMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [value, setValue] = React.useState(''); //значение поля поиска фильма
  const [checkBox, setCheckBox] = React.useState(false); //Значение переключателя


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
      })
      .catch((err) => {
        console.log(`${err}`);
        setErrorMessage("Что-то пошло не так! Попробуйте еще раз");
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
        setErrorMessage("Что-то пошло не так! Попробуйте еще раз");
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
        setErrorMessage("Что-то пошло не так! Попробуйте еще раз");
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
    setLoggedIn(false);
    setCurrentUser({})
    navigate('/');
  }

  // Получение списка фильмов со стороннего апи
  function getMoviesList() {
    setIsLoading(true)
    moviesApi.getMoviesList()
      .then((allData)=> {
        setMovies(allData)
        localStorage.setItem('allData', JSON.stringify(allData));
        console.log(allData)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false)
      })
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
  function filteredMoviesDur(searchMovies) {
    if (checkBox) {
      return searchMovies.filter((searchMovies) => searchMovies.duration <= 40);
    }
    return searchMovies;
  }

  // Обработчик сабмита поиска фильмов
  function submitSearch(value) {
    getMoviesList();
    setSearchMovies(filteredMoviesVal(movies, value));
    localStorage.setItem("searchRes", JSON.stringify(filteredMoviesVal(movies, value)));
  }

  React.useEffect(() => {
    if (checkBox) {
      setShortMovies(filteredMoviesDur(searchMovies));
    }
}, [checkBox]);

  // Сохранение фильма в избранные
  function saveFavoriteMovie(movie) {
    mainApi.addCard(movie)
      .then((data) => {
        setFavoriteMovie([...favoriteMovie, data])
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

  // Выборка фильмов по ключевому слову в сохраненных фильмах
  function filteredMyMoviesVal(favoriteMovie, value) {
    const filtered = favoriteMovie.filter((favoriteMovie) => {
      return (
        favoriteMovie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
        favoriteMovie.nameEN.toLowerCase().includes(value.toLowerCase())
      )
    })
    return filtered;
  }

  // Выборка фильмов по чекбоксу в сохраненных фильмах
  function filteredMyMoviesDur(searchMovies) {
    if (checkBox) {
      return searchMovies.filter((searchMovies) => searchMovies.duration <= 40);
    }
    return searchMovies;
  }

  React.useEffect(() => {
    if (checkBox) {
      setFavoriteMovie(filteredMyMoviesDur(favoriteMovie));
    } else {
      getFavoriteMovies()
    }
}, [checkBox]);

  // Обработчик сабмита поиска фильмов в сохраненных фильмах
  function submitSearchMyFilm(value) {
    getFavoriteMovies();
    setSearchMovies(filteredMyMoviesVal(favoriteMovie, value));
    localStorage.setItem("searchResMyFilm", JSON.stringify(filteredMyMoviesVal(favoriteMovie, value)));
  }

  // Удаление фильма из избранных
  function handleCardDelete(card) {
    mainApi.deleteCard(card._id)
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
              checkBox={checkBox}
              setCheckBox={setCheckBox}
              movies={checkBox ? shortMovies : searchMovies}
              saveFavoriteMovie={saveFavoriteMovie}
              filteredMovies={filteredMoviesVal}
              />
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute element={SavedMovies}
              loggedIn={loggedIn}
              onClick={handlePopupMenuClick}
              isOpen={isPopupMenu}
              onClose={closePopup}
              value={value}
              setValue={setValue}
              onSubmitSearch={submitSearchMyFilm}
              checkBox={checkBox}
              setCheckBox={setCheckBox}
              movies={!value ? favoriteMovie : searchMovies}
              handleCardDelete={handleCardDelete}
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
            <Login handleLogin={handleLogin}
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

      </div>
    </CurrentUserContext.Provider>
  );

};

export default App;
