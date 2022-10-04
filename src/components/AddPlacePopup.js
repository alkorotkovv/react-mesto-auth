import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

  const [place, setPlace] = React.useState("");
  const [url, setUrl] = React.useState("");

  function handlePlaceChange(evt) {
    setPlace(evt.target.value);
  }

  function handleUrlChange(evt) {
    setUrl(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      place: place,
      url: url,
    });
  }
  
  return (
    <PopupWithForm name="card_add" title="Новое место" buttonText="Создать" onClose = {props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} >
      <fieldset className="form__info">
        <label className="form__field">
          <input className="form__input form__input_content_place" id="input-place" value={place} onChange={handlePlaceChange} type="text" name="place" placeholder="Название" required minLength="2" maxLength="30"/>
          <span className="form__input-error input-place-error" ></span>
        </label>
        <label className="form__field">
          <input className="form__input form__input_content_url" id="input-url" value={url} onChange={handleUrlChange} type="url" name="url" placeholder="Ссылка на картинку" required/>
          <span className="form__input-error input-url-error" ></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;