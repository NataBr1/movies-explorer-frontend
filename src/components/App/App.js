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
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [errorMessageInSave, setErrorMessageInSave] = React.useState('')
  const [isPopupMenu, setIsPopupMenu] = React.useState(false);
  const [isPopupEditProfile, setIsPopupEditProfile] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  const [favoriteMovies, setFavoriteMovies] = React.useState([]);
  const [rawFaforiteMovies, setRawFaforiteMovies] = React.useState([favoriteMovies]);
  const [searchMovies, setSearchMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [textInfo, setTextInfo] = React.useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Получение информации по пользователе
  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        //console.log(user)
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    }
  }, [loggedIn]);

  // Закрываем окошко с информацией
  function startInfoTooltip() {
    setIsInfoTooltipOpen(true);
    setTimeout(() => setIsInfoTooltipOpen(false), 1200);
  }

  // Регистрация пользователя
  function handleRegister ({ name, email, password }) {
    setErrorMessage('')
    mainApi.register({ name, email, password })
      .then(() => {
        handleLogin ({ email, password })
        startInfoTooltip();
        setTextInfo("Вы успешно зарегистрировались!")
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
          startInfoTooltip();
          setTextInfo("Добро пожаловать!")
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
      .finally(()=> {
        setErrorMessage('')
      })
  }

  // Изменение данных о пользователе
  function handleUpdateUser(data) {
    setErrorMessage('')
    mainApi.setUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        startInfoTooltip();
        setTextInfo("Данные успешно изменены!")
        setErrorMessage('')
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
    localStorage.clear(); // вроде клиар, но плохо чистит и черерз раз, почистим вручную
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('request');
    localStorage.removeItem('switchStatus');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('allMovies');
    setLoggedIn(false);
    setCurrentUser({});
    setMovies([]);
    setFavoriteMovies([]);
    setErrorMessage('');
    //setErrorMessageInSave('')
    //setSearchMovies([]);
    setAllMovies([]);
    setTextInfo('');
    navigate('/');
  }

  // получаем сохраненные фильмы сразу переходя во вкладку "сохр.фильмы"
  React.useEffect(() => {
    getFavoriteMovies();
  }, [])

  // Получение списка сохраненных фильмов
  function getFavoriteMovies() {
    mainApi.getFavoriteMovies()
      .then((data)=> {
        setFavoriteMovies(data)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  // Сохранение фильма в избранные
  function saveFavoriteMovie(movie) {
    mainApi.addCard(movie)
      .then((data) => {
        setFavoriteMovies([data, ...favoriteMovies])
      })
      .catch((err) => {
        console.log(`${err}`);
      })
    }

  // Удаление фильма из избранных
  function handleCardDelete(card) {
    const savedCard = favoriteMovies.find((item) => item.movieId === card.id || item.movieId === card.movieId);
    mainApi.deleteCard(savedCard._id)
      .then(() => {
        setFavoriteMovies((state) => state.filter((item) => item._id !== card._id));
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
            <Main
              loggedIn={loggedIn}
              isOpen={isPopupMenu}
              onClose={closePopup}
              onClick={handlePopupMenuClick} />
          } />

          <Route path="/movies" element={
            <ProtectedRoute element={Movies}
              movies={movies}
              setMovies={setMovies}
              favoriteMovies={favoriteMovies}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onClick={handlePopupMenuClick}
              isOpen={isPopupMenu}
              onClose={closePopup}
              saveFavoriteMovie={saveFavoriteMovie}
              deleteFavoriteMovie={handleCardDelete}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              searchMovies={searchMovies}
              setSearchMovies={setSearchMovies}
              loggedIn={loggedIn}
              allMovies={allMovies}
              setAllMovies={setAllMovies}
              />
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute element={SavedMovies}
              loggedIn={loggedIn}
              onClick={handlePopupMenuClick}
              isOpen={isPopupMenu}
              onClose={closePopup}
              favoriteMovies={favoriteMovies}
              setFavoriteMovies={setFavoriteMovies}
              deleteFavoriteMovie={handleCardDelete}
              getFavoriteMovies={getFavoriteMovies}
              isLoading={isLoading}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              rawFaforiteMovies={rawFaforiteMovies}
              setRawFaforiteMovies={setRawFaforiteMovies}/>
          } />

          <Route path="/profile" element={
            <ProtectedRoute element={Profile}
              isLoading={isLoading}
              loggedIn={loggedIn}
              isOpenEditProfile={isPopupEditProfile}
              onCloseEditProfile={closePopup}
              onClickEditProfile={handlePopupEditProfile}
              onUpdateUser={handleUpdateUser}
              isOpen={isPopupMenu}
              onClick={handlePopupMenuClick}
              signOut={signOut} />
            }/>

          <Route path="/signin" element={
            <Login
              isLoading={isLoading}
              loggedIn={loggedIn}
              handleLogin={handleLogin}
              errorMessage={errorMessage} />
          } />

          <Route path="/signup" element={
            <Register
              isLoading={isLoading}
              loggedIn={loggedIn}
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
            textInfo={textInfo}
        />

      </div>
    </CurrentUserContext.Provider>
  );

};

export default App;
