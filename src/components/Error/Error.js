import './Error.css'
import React from "react";

function Error () {
  return (
    <section className="error">
      <h2 className="error__status">404</h2>
      <p className="error__text">Страница не найдена</p>
      <button className="error__button" type="submit" aria-label="Назад">Назад</button>
    </section>
  )
}

export default Error;
