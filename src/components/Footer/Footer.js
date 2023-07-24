import './Footer.css'
import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__group">
        <p className="footer__year footer__element">© {new Date().getFullYear()}</p>
        <div className="footer__nav">
          <p className="footer__yandex footer__element">Яндекс.Практикум</p>
          <p className="footer__github footer__element">Github</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
