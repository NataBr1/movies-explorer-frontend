import React from "react";
import './InfoTooltip.css';
import usePopupClose from "../../hooks/usePopupClose";
import logo from "../../images/logo.svg"

function InfoTooltip ({ isOpen, onClose }) {

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup${isOpen ? "_opened" : ""}`}>
        <div className="popup__container">
          <img className="autorize__res-img"
            src={logo}
            alt="Изображение логотипа"
          />
          <h2 className="autorize__res-text">Вы успешно зарегистрировались!</h2>
          <button
            className="popup__closed"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          />
        </div>
    </div>
  );
}

export default InfoTooltip ;
