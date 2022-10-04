import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
  }


  return (
    <form className="form form_type_login" name="form_login" noValidate>
      <h2 className="form__title form__title_type_login">{props.title}</h2>
      <fieldset className="form__info">
        <label className="form__field">
          <input className="form__input form__input_content_email" id="input-email" type="text" name="email" placeholder="Email" required minLength="2" maxLength="40"/>
          <span className="form__input-error input-email-error" ></span>
        </label>
        <label className="form__field">
          <input className="form__input form__input_content_password" id="input-password" type="text" name="password" placeholder="Пароль" required minLength="2" maxLength="200"/>
          <span className="form__input-error input-password-error" ></span>
        </label>
      </fieldset>
      <button className="form__save-button form__save-button_type_login" onClick={props.onSubmit} type="submit" >{props.buttonText}</button>
      <Link to="/sign-in" className="form__question">Уже зарегистрированы? Войти</Link>
    </form>
  )
}

export default Register;