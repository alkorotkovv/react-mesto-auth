function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name}` + (props.isOpen && " popup_opened") }>
      <div className="popup__container">
        <form className="form form_profile_edit" name={`form_${props.name}`} noValidate>
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button className="form__save-button" onClick={props.onSubmit} type="submit" >{props.buttonText}</button>
        </form>
          <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Close"></button>
      </div>
    </div>
  )
}

export default PopupWithForm;
