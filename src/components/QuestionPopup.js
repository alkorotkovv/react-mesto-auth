function QuestionPopup(props) {

  function handleClick(evt) {
    if (evt.target.classList.contains('popup_opened'))
    props.onClose();
  }
  
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(props.card);
  }

  return (
    <div className={`popup popup_type_delete` + (props.isOpen && " popup_opened")} onClick={handleClick}>
      <div className="popup__container">
        <form className="form form_card_delete" name="form_card_delete" noValidate>
          <h2 className="form__title">Вы уверены?</h2>
          <button className="form__save-button" type="submit" onClick={handleSubmit}>Да</button>
        </form>
        <button className="popup__close-button" type="button" aria-label="Close" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default QuestionPopup;
