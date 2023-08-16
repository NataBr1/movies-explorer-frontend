import './PopupEditProfile.css'
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
//import { useForm } from "../../hooks/useForm"
import useFormValidation from '../../utils/useFormValidation';

function PopupEditProfile({ isOpen, onUpdateUser, errorMessage }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, setValues, handleChange, errors } = useFormValidation({
    name: '',
    email: '',
  })

  function handleSubmit(e) {
    e.preventDefault();
      onUpdateUser({
        name: values.name,
        email: values.email,
    });
  }

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email
    })
  }, [isOpen, currentUser, setValues]);

  return (
    <section className={`popupEditProfile ${isOpen ? "popupEditProfile_opened": ""}`} >
      <form className="popupEditProfile__form" onSubmit={handleSubmit} noValidate >
        <label className="popupEditProfile__field">
          <span className="popupEditProfile__span">Имя</span>
          <input
            className={`popupEditProfile__input ${errors.name ? "popupEditProfile__input_error" : ""}`}
            name="name"
            type="text"
            defaultValue={currentUser.name}
            placeholder="Введите имя"
            autoComplete="off"
            minLength={2}
            maxLength={30}
            onChange={handleChange}
            required
          />
        </label>
        <label className="popupEditProfile__field">
          <span className="popupEditProfile__span">E&#8209;mail</span>
          <input
            className="popupEditProfile__input"
            name="email"
            type="email"
            defaultValue={currentUser.email}
            placeholder="Введите свой e-mail"
            autoComplete="off"
            minLength={6}
            maxLength={30}
            onChange={handleChange}
            require
          />
        </label>
        <div className="popupEditProfile__box-error"><span className="popupEditProfile__text-error">{errorMessage}</span></div>
        <button className="popupEditProfile__save" type="submit">Сохранить</button>
      </form>
    </section>
  )
}

export default PopupEditProfile;
