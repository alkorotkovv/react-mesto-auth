import React from 'react';

function FormAuth(props) {

  return (
    <form className="form form_type_login" name="form_login" onSubmit={props.onSubmit} noValidate>
      <h2 className="form__title form__title_type_login">{props.title}</h2>
      <fieldset className="form__info">
        <label className="form__field">
          <input className="form__input form__input_content_email" id="input-email" type="text" value={props.email} onChange={props.onEmailChange} name="email" placeholder="Email" required minLength="2" maxLength="40"/>
          <span className="form__input-error input-email-error" ></span>
        </label>
        <label className="form__field">
          <input className="form__input form__input_content_password" id="input-password" type="password" value={props.password} onChange={props.onPasswordChange} name="password" placeholder="Пароль" required minLength="2" maxLength="200"/>
          <span className="form__input-error input-password-error" ></span>
        </label>
      </fieldset>
      <button className="form__save-button form__save-button_type_login" type="submit" >{props.buttonText}</button>      
    </form>
  )
}

export default FormAuth;