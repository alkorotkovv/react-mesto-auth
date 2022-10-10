import React, {useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

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
import QuestionPopup from './QuestionPopup.js';

function App() {

  const [currentUser, setCurrentUser] = useState({name: "", about: "", avatar: ""});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardToDelete, setSelectedCardToDelete] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("randomemail@mail.ru");
  const [tooltip, setTooltipText] = useState({text:"текст ошибки", isAnswerGood: false});
  const history = useHistory();

  function handleTooltipDisplay(text, isAnswerGood) {
    setTooltipText({text: text, isAnswerGood: isAnswerGood});
  }

  useEffect(() => {
    if (isEditProfilePopupOpen || isQuestionPopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isInfoTooltipPopupOpen)
      document.addEventListener("keydown", handleKeyPress);
    return () => { document.removeEventListener("keydown", handleKeyPress)};
  }, [isEditProfilePopupOpen,
      isQuestionPopupOpen,
      isAddPlacePopupOpen,
      isEditAvatarPopupOpen,
      isInfoTooltipPopupOpen
  ])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn])

  useEffect(() => {
    checkToken();
  }, [])

  function handleKeyPress(evt) {
    if (evt.key === 'Escape')
      closeAllPopups();
  }

  function checkToken() {
    if (localStorage.getItem('token')) {
      apiAuth.getUserByToken(localStorage.getItem('token'))
        .then(res => {
          if (res.data) {
            const {_id, email} = res.data;
            setLoggedIn(true);
            setEmail(email);
            history.push("/");
          }
          else {
            history.push("/sign-in");
          }
        })
        .catch((err) => {
          console.log(err);
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

  function handleDeleteCard(card) {
    api.deleteCard(card)
      .then((res) => {
        setCards(cards.filter((c) => c._id !== card._id));
        setIsQuestionPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDeleteClick(card) {
    setSelectedCardToDelete(card);
    setIsQuestionPopupOpen(true);
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
    setIsQuestionPopupOpen(false);
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
  function handleLoginSubmit(email, password) {
    apiAuth.loginUser(email, password)
      .then((res) => {
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
      })
      .catch((err) => {
        console.log(err);
      })  
  }  

  //Обработчик сабмита формы регистрации
  function handleRegisterSubmit(email, password) {
    apiAuth.registerUser(email, password)
      .then((res) => {
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
      })
      .catch((err) => {
        console.log(err);
      })  
  }
  
  //Обработчик выхода из аккаунта
  function handleExitSubmit() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header  email={email} onExit={handleExitSubmit} loggedIn={loggedIn}/>
        <Switch>
          <Route path="/sign-in">
            <Login onLogin={handleLoginSubmit} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegisterSubmit} />
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
            onCardDelete={handleCardDeleteClick}
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
        <QuestionPopup card={selectedCardToDelete} isOpen={isQuestionPopupOpen} onClose={closeAllPopups} onSubmit={handleDeleteCard}  />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
