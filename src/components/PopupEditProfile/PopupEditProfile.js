import './PopupEditProfile.css'
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm"

function PopupEditProfile({ isOpen, onClick, onUpdateUser }) {
  // const currentUser = React.useContext(CurrentUserContext);
  // const {values, handleChange, setValues} = useForm({});

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   onUpdateUser({
  //     name: values.name,
  //     email: values.email,
  //   });
  // }

  // React.useEffect(() => {
  //   setValues({
  //     name: currentUser.name,
  //     email: currentUser.email
  //   })
  // }, [isOpen, currentUser]);

  return (
   <section className={`popupEditProfile ${isOpen ? "popupEditProfile_opened": ""}`} >
      <form className="popupEditProfile__form"  >
        <label className="popupEditProfile__field">
          <span className="popupEditProfile__span">Имя</span>
          <input
            className="popupEditProfile__input"
            name="name"
            type="text"
            defaultValue=""
            placeholder="Введите имя"
            autoComplete="off"
            minLength={2}
            maxLength={30}
            // onChange={handleChange}
            required="">
          </input>
        </label>
        <label className="popupEditProfile__field">
          <span className="popupEditProfile__span">E&#8209;mail</span>
          <input
            className="popupEditProfile__input"
            name="email"
            type="email"
            defaultValue=""
            placeholder="Введите свой e-mail"
            autoComplete="off"
            minLength={6}
            maxLength={30}
            // onChange={handleChange}
            required="">
          </input>
        </label>
        <div className="popupEditProfile__box-error"><span className="popupEditProfile__text-error">{}</span></div>
        <button className="popupEditProfile__save"type="submit" onClick={onClick}>Сохранить</button>
      </form>
   </section>
  )
}

export default PopupEditProfile;
