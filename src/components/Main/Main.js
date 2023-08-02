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

function Main({ loggedIn }) {
  return (
    <div className="main">
      {loggedIn ? <Header classNameHeader={"header header_color"}/> : <NavTab classNameHeader={"header"}/> }
      <main>
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
