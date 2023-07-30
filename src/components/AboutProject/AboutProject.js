import './AboutProject.css'
import React from "react";

function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProjec">

      <h2 className="aboutProject__title">О проекте</h2>

      <div className="aboutProject__boxtext">
        <h3 className="aboutProject__subtitle tl">Дипломный проект включал 5 этапов</h3>
        <p className="aboutProject__text bl">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h3 className="aboutProject__subtitle tr">На выполнение диплома ушло 5 недель</h3>
        <p className="aboutProject__text br">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>

      <div className="aboutProject__time">
        <div className="aboutProject__time-left"><p className="time-text">1 неделя</p></div>
        <div className="aboutProject__time-right"><p className="time-text">4 недели</p></div>
        <p className="time-signature backend">Back-end</p>
        <p className="time-signature frontend">Front-end</p>
      </div>

    </section>
  )
}

export default AboutProject;
