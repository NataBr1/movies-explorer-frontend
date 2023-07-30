import './Promo.css'
import React from "react";
import logo from '../../images/logo_landing.svg'

function Promo() {
  return (
    <section className="promo">
      <div>
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__button" href="#aboutProjec">Узнать больше</a>
      </div>
      <>
        <img className="promo__logo" src={logo} alt="Изображение логотипа"/>
      </>
    </section>
  )
}

export default Promo;
