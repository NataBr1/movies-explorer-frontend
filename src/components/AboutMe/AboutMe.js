import './AboutMe.css'
import React from "react";
import photo from '../../images/default_photo.jpg';

function AboutMe() {
  return (
    <section className="aboutMe">

      <h2 className="aboutMe__title">Студент</h2>

      <div className="aboutMe__box">
        <div className="aboutMe__leftPart">
          <h3 className="aboutMe__name">Наталья</h3>
          <p className="aboutMe__about">Фронтенд-разработчик, 35 лет</p>
          <p className="aboutMe__text">Таким образом реализация намеченных плановых заданий позволяет оценить значение соответствующий условий активизации. Таким образом сложившаяся структура организации позволяет выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач.</p>
          <a className="aboutMe__link" href="https://github.com/NataBr1" target="_blank" rel="noreferrer">Github</a>
        </div>

        <div>
          <img className="aboutMe__photo" src={photo} alt="Фотография студента"/>
        </div>
      </div>

    </section>
  )
}

export default AboutMe;
