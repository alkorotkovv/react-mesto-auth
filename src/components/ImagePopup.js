function ImagePopup(props) {

  function handleClick(evt) {
    if (evt.target.classList.contains('popup_opened'))
    props.onClose();
  }

  return (
    <div className={`popup popup_type_card` + (Object.keys(props.card).length ? " popup_opened" : "")} onClick={handleClick}> 
      <div className="popup__container">
        <figure className="card-scale">
            <img className="card-scale__image" src={props.card.link} alt={props.card.name}/>
            <figcaption className="card-scale__caption">{props.card.name}</figcaption>
        </figure>
        <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Close"></button>
      </div>
    </div>
  )
}

export default ImagePopup;