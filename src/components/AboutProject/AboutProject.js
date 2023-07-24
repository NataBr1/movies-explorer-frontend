import './AboutProject.css'
import React from "react";

function AboutProject() {
  return (
    <article className="aboutProject" id="aboutProjec">
      <h2 className="aboutProject__title">О проекте</h2>
      <div className="aboutProject__boxtext">
        <h3 className="aboutProject__subtitle tl">Дипломный проект включал 5 этапов</h3>
        <p className="aboutProject__text bl">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h3 className="aboutProject__subtitle tr">На выполнение диплома ушло 5 недель</h3>
        <p className="aboutProject__text br">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>

      <div className="aboutProject__time">
        <div class="time__left"><p className="time__text">1 неделя</p></div>
        <div class="time__right"><p className="time__text">4 недели</p></div>
        <p class="time__signature backend">Back-end</p>
        <p class="time__signature frontend">Front-end</p>
      </div>
    </article>
  )
}

export default AboutProject;
