import './App.css';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
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
// import Preloader from '../Preloader/Preloader';

function App() {
  const [isPopupMenu, setIsPopupMenu] = React.useState(false);
  const [isPopupEditProfile, setIsPopupEditProfile] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [favoriteMovie, setFavoriteMovie] = React.useState([]);
  const [userData, setUserData] = React.useState({ name: '', email: '' })
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   mainApi.getUserInfo()
  //     .then((data) => {
  //       setCurrentUser(data);
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.log(`${err}`);
  //     });
  // }, []);

  //Регистрация пользователя
  function handleRegister (name, email, password) {
    mainApi.register(name, email, password)
      .then(() => {
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  //Авторизация пользователя
  function handleLogin ({ email, password }) {
    mainApi.authorize(email, password)
      .then(() => {
          localStorage.setItem('loggedIn', true);
          setLoggedIn(true);
          navigate("/movies", {replace: true});
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  // //изменение данных о пользователе
  // function handleUpdateUser(data) {
  //   mainApi.setUserInfo(data)
  //     .then((res) => {
  //       setCurrentUser(res);
  //       closePopup();
  //     })
  //     .catch((err) => console.log(err))
  // }

  //Проверка токена
  function checkToken () {
    if (localStorage.getItem('loggedIn')) {
      mainApi.checkToken()
        .then((user) => {
          setUserData({ name: user.name, email: user.email })
          navigate("/movies", {replace: true});
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    }
  }

  React.useEffect(() => {
    checkToken()
  }, []);

  //Выход из аккаунта
  function signOut() {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    navigate('/');
  }

  function getMoviesList() {
    setIsLoading(true)
    moviesApi.getMoviesList()
      .then((data)=> {
        setMovies(data)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function getFavoriteMovies() {
    mainApi.getFavoriteMovies()
      .then((data)=> {
        setFavoriteMovie(data)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  // function saveFavoriteMovie() {
  //     mainApi.addCard()
  //       .then((movie) => {
  //         setFavoriteMovie([movie, ...favoriteMovie])
  //       })
  //   }

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

      <div className="page">

        <Routes>

          <Route path="/" element={
            <Main loggedIn={loggedIn}/>
          } />

          <Route path="/movies" element={
            <Movies
              isOpen={isPopupMenu}
              onClose={closePopup}
              onClick={handlePopupMenuClick}
              showFilmList={getMoviesList}
              movies={movies}
              isLoading={isLoading}
              />
          } />

          <Route path="/saved-movies" element={
            <SavedMovies
              isOpen={isPopupMenu}
              onClose={closePopup}
              onClick={handlePopupMenuClick}
              favoriteMovie={favoriteMovie}
              // showFavoriteMovies={getFavoriteMovies}
              />
          } />

          <Route path="/profile" element={
            <Profile
              isOpenEditProfile={isPopupEditProfile}
              onCloseEditProfile={closePopup}
              onClickEditProfile={handlePopupEditProfile}
              // onUpdateUser={handleUpdateUser}
              isOpen={isPopupMenu}
              onClick={handlePopupMenuClick}
              userData={userData}
              signOut={signOut}
              />
          } />

          <Route path="/signin" element={
            <Login handleLogin={handleLogin} />
          } />

          <Route path="/signup" element={
            <Register handleRegister={handleRegister} />
          } />

          <Route path="*" element={
            <Error />
          } />

        </Routes>

      </div>

  );

};

export default App;
