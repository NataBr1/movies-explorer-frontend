import { Link } from 'react-router-dom';
import './Error.css'
import React from "react";

function Error () {
  return (
    <main className="error">
      <h1 className="error__status">404</h1>
      <p className="error__text">Страница не найдена</p>
      <Link to="/" className="error__button">Назад</Link>
    </main>
  )
}

export default Error;
