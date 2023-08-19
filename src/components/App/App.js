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

function App() {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [errorMessageInSave, setErrorMessageInSave] = React.useState('')
  const [isPopupMenu, setIsPopupMenu] = React.useState(false);
  const [isPopupEditProfile, setIsPopupEditProfile] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [favoriteMovie, setFavoriteMovie] = React.useState([]);
  const [searchMovies, setSearchMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [value, setValue] = React.useState(''); //значение поля поиска фильма
  const [valueInSave, setValueInSave] = React.useState(''); //значение поля поиска фильма на странице сохраненных фильмов
  const [checkBox, setCheckBox] = React.useState(false); //Значение переключателя
  const [checkBoxInSave, setCheckBoxInSave] = React.useState(false); //Значение переключателя на странице сохраненных фильмах
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [textInfo, setTextInfo] = React.useState("");

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

  // Регистрация пользователя
  function handleRegister ({ name, email, password }) {
    setErrorMessage('')
    mainApi.register({ name, email, password })
      .then(() => {
        handleLogin ({ email, password })
        setIsInfoTooltipOpen(true);
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
        setIsInfoTooltipOpen(true);
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
    setFavoriteMovie([]);
    setSearchMovies([]);
    setErrorMessage("");
    navigate('/');
  }

  function startLoading() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
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

  function handleFilteredMovies(allMovies, value, checkBox) {
    const moviesList = filteredMoviesVal(allMovies, value, checkBox);
    setMovies(moviesList);
    setSearchMovies(checkBox ? filteredMoviesDur(moviesList) : moviesList);
    localStorage.setItem("foundMovies", JSON.stringify(moviesList));
    if (moviesList.length === 0) {
      setErrorMessage("Ничего не найдено");
    } else {
      setErrorMessage("");
    }
  }

  // Функция отображения фильмов при переключении чекбокса
  function handleCheckBox() {
    setCheckBox(!checkBox);
    if (!checkBox) {
      if (filteredMoviesDur(movies).length === 0) {
        setSearchMovies(filteredMoviesDur(movies));
        setErrorMessage("Ничего не найдено")
      } else {
        setSearchMovies(filteredMoviesDur(movies));
      }
    } else {
      setSearchMovies(movies);
      setErrorMessage("")
    }
    localStorage.setItem("switchStatus", !checkBox);
  }

  // Обработчик сабмита поиска фильмов
  function submitSearch(value) {
    setErrorMessage("");
    startLoading();
    localStorage.setItem("request", value); //сохраняем текст запроса
    localStorage.setItem("switchStatus", checkBox); // сохраняем статус чекбокса
    if (localStorage.getItem("allMovies")) { // если уже есть список всех фильмов, возьмем оттуда
      const allMovies = JSON.parse(localStorage.getItem("allMovies"));
      handleFilteredMovies(allMovies, value, checkBox);
    } else { // или включаем прелоадер и тянем все фильмы с апи и сохраняем в localStorage
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

  // Получение фильмов из localStorage
  React.useEffect(() => {
    if (localStorage.getItem("foundMovies")) {
      const movies = JSON.parse(localStorage.getItem("foundMovies"));
      setMovies(movies);
      if (localStorage.getItem("switchStatus") === "true") {
        setSearchMovies(filteredMoviesDur(movies));
      } else {
        setSearchMovies(movies);
      }
    }
  }, []);

  // Получение короткомеражек из localStorage
  React.useEffect(() => {
    if (localStorage.getItem("switchStatus") === "true") {
      setCheckBox(true);
    } else {
      setCheckBox(false);
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("request")) {
      const dataValue = JSON.stringify(localStorage.getItem("request"));
      setValue(dataValue.replace(/\"/g, ""));
    }
  }, []);

  // Сохранение фильма в избранные
  function saveFavoriteMovie(movie) {
    mainApi.addCard(movie)
      .then((data) => {
        setFavoriteMovie([data, ...favoriteMovie])
        //console.log(data)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
    }

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

  // получаем сохраненные фильмы сразу переходя во вкладку "сохр.фильмы"
  React.useEffect(() => {
    getFavoriteMovies();
  }, [])

  // Получение списка сохраненных фильмов
  function getFavoriteMovies() {
    mainApi.getFavoriteMovies()
      .then((data)=> {
        setFavoriteMovie(data)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  // Фильтруем сохраненные фильмы по длительности
  function filteredMyMoviesDur (favoriteMovie) {
    return favoriteMovie.filter((favoriteMovie) => favoriteMovie.duration <= 40);
  }

  // Отображаем короткометражки, если есть, а если нет - сообщение
  function handleCheckBoxInSave() {
    setCheckBoxInSave(!checkBoxInSave);
    if (!checkBoxInSave) {
      if (filteredMyMoviesDur(favoriteMovie).length === 0) {
        setFavoriteMovie([]);
        setErrorMessageInSave("Ничего не найдено")
      } else {
        setFavoriteMovie(filteredMyMoviesDur(favoriteMovie));
        setErrorMessageInSave("");
      }
    } else {
      getFavoriteMovies()
      setErrorMessageInSave("")
    }
  }

  function handleFilteredMyMovies(favoriteMovie, valueInSave, checkBoxInSave) {
    const myMoviesList = filteredMoviesVal(favoriteMovie, valueInSave, checkBoxInSave);
    setMovies(myMoviesList);
    setFavoriteMovie(checkBoxInSave ? filteredMoviesDur(myMoviesList) : myMoviesList);
    if (myMoviesList.length === 0) {
      setErrorMessageInSave("Ничего не найдено");
    } else {
      setErrorMessageInSave("");
    }
  }

  function searchSavedMovies(valueInSave) {
    startLoading();
    handleFilteredMyMovies(favoriteMovie, valueInSave, checkBoxInSave);
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
              favoriteMovie={favoriteMovie}
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
              value={valueInSave}
              setValue={setValueInSave}
              onSubmitSearch={searchSavedMovies}
              onFilterMovies={handleCheckBoxInSave}
              checkBox={checkBoxInSave}
              setCheckBox={setCheckBoxInSave}
              favoriteMovie={favoriteMovie}
              deleteFavoriteMovie={handleCardDelete}
              getFavoriteMovies={getFavoriteMovies}
              isLoading={isLoading}
              errorMessage={errorMessageInSave}
              valueInSave={valueInSave}/>
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
              setErrorMessage={setErrorMessage}
              signOut={signOut} />
            }/>

          <Route path="/signin" element={
            <Login
              loggedIn={loggedIn}
              handleLogin={handleLogin}
              errorMessage={errorMessage} />
          } />

          <Route path="/signup" element={
            <Register
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
