import headerLogo from '../images/logo.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_tooltip` + (props.isOpen && " popup_opened") }>
      <div className="popup__container">
        <img className="card-scale__image" src={props.card.link} alt={props.card.name}/>
        <h2 className="form__title">{props.title}</h2>
        <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Close"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;