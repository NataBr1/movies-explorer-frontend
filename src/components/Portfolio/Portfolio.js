import './Portfolio.css'
import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">

      <h2 className="portfolio__title">Портфолио</h2>

      <ul className="portfolio__list">
        <li className="portfolio__element">
          <a className="portfolio__name" href="https://github.com/NataBr1/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a>
        </li>
        <li className="portfolio__element">
          <a className="portfolio__name" href="https://natabr1.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт</a>
        </li>
        <li className="portfolio__element">
          <a className="portfolio__name" href="https://natasha.br.nomoreparties.sbs/" target="_blank" rel="noreferrer">Одностраничное приложение</a>
        </li>
      </ul>
      
    </section>
  )
}

export default Portfolio;
