import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import api from '../utils/Api.js';
import apiAuth from '../utils/ApiAuth.js';
import CurrentUserContext from '../context/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';

function App() {

  const [currentUser, setCurrentUser] = useState({name: "", about: "", avatar: ""});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("randomemail@mail.ru");
  const [tooltip, setTooltipText] = useState({text:"текст ошибки", isAnswerGood: false});
  const history = useHistory();

  function handleTooltipDisplay(text, isAnswerGood) {
    setTooltipText({text: text, isAnswerGood: isAnswerGood});
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    checkToken();
  }, []);


  function checkToken() {
    console.log("Проверяем токен");
    if (localStorage.getItem('token')) {
      apiAuth.getUserByToken(localStorage.getItem('token'))
      .then(res => {
        //console.log(res.data);
        const {_id, email} = res.data;
        setLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(person => person._id === currentUser._id);
    api.toggleLikeCard(card, isLiked)
    .then((newCard) => {
      setCards(cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
    .then((res) => {
      setCards(cards.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userObject) {
    api.setUserInfo(userObject)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(avatarObject) {
    api.setUserAvatar(avatarObject)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlace(placeObject) {
    api.addCard(placeObject)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //Обработчик сабмита формы входа
  function handleLoginSubmit(res, email) {
    if (res.token) {
      localStorage.setItem('token', res.token);
      setEmail(email);
      setLoggedIn(true);
      history.push("/");
    }
    else {
      handleTooltipDisplay(res, false);
      setIsInfoTooltipPopupOpen(true);
    }
  }

  //Обработчик сабмита формы регистрации
  function handleRegisterSubmit(res) {
    if (res.data) {
      handleTooltipDisplay("Вы успешно зарегистрировались!", true);
      setIsInfoTooltipPopupOpen(true);
      setTimeout(() => {
        setIsInfoTooltipPopupOpen(false);
        history.push("/sign-in");
      }, 2000);
    }
    else {
      handleTooltipDisplay(res, false);
      setIsInfoTooltipPopupOpen(true);
    }        
  }
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header  email={email}  />
        <Switch>
          <Route path="/sign-in">
            <Login title="Вход" buttonText="Войти" 
              onLogin={handleLoginSubmit}

              />
          </Route>
          <Route path="/sign-up">
            <Register title="Регистрация" buttonText="Зарегистрироваться" 
              onRegister={handleRegisterSubmit}
            />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick} 
            cards={cards} 
            onCardLike={handleCardLike} 
            onCardDelete={handleCardDelete}
            component={Main}
          />
        </Switch>
        <Footer />
        <ImagePopup card={selectedCard} onClose = {closeAllPopups} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <PopupWithForm name="card_delete" title="Вы уверены?" />
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isAnswerGood={tooltip.isAnswerGood} title={tooltip.text} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
