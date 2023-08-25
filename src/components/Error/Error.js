import { useNavigate } from 'react-router-dom';
import './Error.css'
import React from "react";

function Error () {
  const navigate = useNavigate();

  function comeBack() {
    navigate(-1)
  }

  return (
    <main className="error">
      <h1 className="error__status">404</h1>
      <p className="error__text">Страница не найдена</p>
      <button className="error__button" type='button' onClick={comeBack}>Назад</button>
    </main>
  )
}

export default Error;
