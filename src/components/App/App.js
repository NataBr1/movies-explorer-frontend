import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Error from '../Error/Error';

function App() {
  const [isPopupMenu, setIsPopupMenu] = React.useState(false);
  const [isPopupEditProfile, setIsPopupEditProfile] = React.useState(false);

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
          <Main />
        } />

        <Route path="/movies" element={
          <Movies isOpen={isPopupMenu} onClose={closePopup} onClick={handlePopupMenuClick} />
        } />

        <Route path="/saved-movies" element={
          <SavedMovies isOpen={isPopupMenu} onClose={closePopup} onClick={handlePopupMenuClick} />
        } />

        <Route path="/profile" element={
          <Profile
            isOpenEditProfile={isPopupEditProfile}
            onCloseEditProfile={closePopup}
            onClickEditProfile={handlePopupEditProfile}
            isOpen={isPopupMenu}
            onClose={closePopup}
            onClick={handlePopupMenuClick} />
        } />

        <Route path="/signin" element={
          <Login />
        } />

        <Route path="/signup" element={
          <Register />
        } />

        <Route path="*" element={
          <Error />
        } />

      </Routes>

    </div>
  );

};

export default App;
