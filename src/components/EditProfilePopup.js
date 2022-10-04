import React from 'react';
import CurrentUserContext from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  
  return (
    <PopupWithForm name="profile_edit" title="Редактировать профиль" buttonText="Сохранить" onClose = {props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} >
      <fieldset className="form__info">
        <label className="form__field">
          <input className="form__input form__input_content_name" id="input-name" value={name} onChange={handleNameChange} type="text" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
          <span className="form__input-error input-name-error" ></span>
        </label>
        <label className="form__field">
          <input className="form__input form__input_content_job" id="input-job" value={description} onChange={handleDescriptionChange} type="text" name="job" placeholder="О себе" required minLength="2" maxLength="200"/>
          <span className="form__input-error input-job-error" ></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;