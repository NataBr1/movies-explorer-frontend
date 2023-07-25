import { Link } from 'react-router-dom';
import './Error.css'
import React from "react";

function Error () {
  return (
    <section className="error">
      <h2 className="error__status">404</h2>
      <p className="error__text">Страница не найдена</p>
      <Link to="/" className="error__button">Назад</Link>
    </section>
  )
}

export default Error;
