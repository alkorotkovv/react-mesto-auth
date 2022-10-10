import React, {useContext} from 'react';
import CurrentUserContext from '../context/CurrentUserContext';

function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (`card__delete ${isOwn ? '' : 'card__delete_hidden'}`);
  const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_active'}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes">
          <button className={cardLikeButtonClassName} type="button" aria-label="Like" onClick={handleLikeClick}></button>
          <p className="card__count">{props.card.likes.length}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Delete" onClick={handleDeleteClick}></button>
    </li>
  )
}

export default Card;