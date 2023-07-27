import './Footer.css'
import React from "react";

function Footer() {
  return (
    <footer className="footer">

      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>

      <div className="footer__group">
        <p className="footer__year footer__element">© {new Date().getFullYear()}</p>
        <div className="footer__nav">
          <a className="footer__yandex footer__element" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className="footer__github footer__element" href="https://github.com" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer;
