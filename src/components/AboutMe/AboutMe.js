import './AboutMe.css'
import React from "react";
import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="aboutMe">

      <h2 className="aboutMe__title">Студент</h2>

      <div className="aboutMe__box">
        <div className="aboutMe__leftPart">
          <h3 className="aboutMe__name">Наталья</h3>
          <p className="aboutMe__about">Фронтенд-разработчик, 35 лет</p>
          <p className="aboutMe__text">Я заканчиваю обучение в Яндекс Практикум по программе Веб-разбработчик. У меня 2 в/о, есть муж и  1.5-годовалая малышка. За плечами опыт работы в HR на протяжении 10 лет, который я планирую оставить в прошлом и развиваться дальше в веб-разработке.</p>
          <a className="aboutMe__link" href="https://github.com/NataBr1" target="_blank" rel="noreferrer">Github</a>
        </div>

        <div>
          <img className="aboutMe__photo" src={photo} alt="Фотография Натальи, фронтенд-разработчика, студенки Яндекс Практикум"/>
        </div>
      </div>

    </section>
  )
}

export default AboutMe;
