import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

  const avatarRef = useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }
  
  return (
    <PopupWithForm name="avatar_edit" title="Обновить аватар" buttonText="Сохранить" onClose = {props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} >
      <fieldset className="form__info">
        <label className="form__field">
          <input className="form__input form__input_content_url" ref={avatarRef} id="input-avatarurl" type="url" name="avatarurl" placeholder="Ссылка на аватар" required/>
          <span className="form__input-error input-avatarurl-error" ></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;