import './App.css';
import React from 'react';
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
      <Main />
      <Movies isPopupMenu={isPopupMenu} closePopup={closePopup} handlePopupMenuClick={handlePopupMenuClick} />
      <SavedMovies isPopupMenu={isPopupMenu} closePopup={closePopup} handlePopupMenuClick={handlePopupMenuClick} />
      <Profile isOpen={isPopupEditProfile} onClickOpen={handlePopupEditProfile} onClickClose={closePopup} />
      <Register />
      <Login />
      <Error />
    </div>
  );
};

export default App;
