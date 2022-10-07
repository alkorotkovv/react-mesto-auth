import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../context/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main className="content">
        <section className="profile">
          <div className="profile__main">
            <div className="profile__avatar" onClick={props.onEditAvatar}>
              <img className="profile__image" src={currentUser.avatar} alt="аватар" />
            </div>
            <div className="profile__info">
              <div className="profile__name-line">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" aria-label="Edit" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" aria-label="Add" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements">
          <ul className="elements__cards">

            { 
              props.cards.map(element => 
                <Card 
                  card={element} 
                  onCardClick={props.onCardClick} 
                  onCardLike={props.onCardLike} 
                  onCardDelete={props.onCardDelete} 
                  key={element._id}
                />
              )
            }

          </ul>
        </section>
      </main>
  );
}

export default Main;