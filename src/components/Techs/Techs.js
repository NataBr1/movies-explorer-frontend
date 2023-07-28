import './Techs.css'
import React from "react";

function Techs() {
  return (
    <section className="techs">

      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__element"><p className="techs__element-text">HTML</p></li>
        <li className="techs__element"><p className="techs__element-text">CSS</p></li>
        <li className="techs__element"><p className="techs__element-text">JS</p></li>
        <li className="techs__element"><p className="techs__element-text">React</p></li>
        <li className="techs__element"><p className="techs__element-text">Git</p></li>
        <li className="techs__element"><p className="techs__element-text">Express.js</p></li>
        <li className="techs__element"><p className="techs__element-text">mongoDB</p></li>
      </ul>

    </section>
  )
}

export default Techs;
