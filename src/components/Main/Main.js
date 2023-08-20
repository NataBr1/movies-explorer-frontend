import './Main.css';
import '../Header/Header.css';
import React from "react";
import NavTab from '../NavTab/NavTab';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import Portfolio from '../Portfolio/Portfolio';
import PopupMenu from '../PopupMenu/PopupMenu';

function Main({ loggedIn, isOpen, onClose, onClick }) {
  return (
    <div className="main">
      {loggedIn ? <Header classNameHeader={"header header_color"} onClick={onClick}/> : <NavTab classNameHeader={"header"}/> }
      <main>
        <PopupMenu isOpen={isOpen} onClose={onClose} />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </div>
  )
}

export default Main;
