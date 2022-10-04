//Класс для формирования запросов к серверу для аутентификации
class ApiAuth {
  constructor(options)
  {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  //Метод реакция на результат запроса
  _checkResult(res) {
    if (res.ok)
        return res.json()
      else
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
  };

  //Метод регистрации пользователя
  registerUser(email, password) {
    return fetch(this._baseUrl + '/signup', {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      password: `${password}`,
      email: `${email}`
    })
    })
    .then(res => this._checkResult(res))
  };








  //Метод получения данных пользователя
  getUserInfo() {
    return fetch(this._baseUrl + 'users/me', {
    method: 'GET',
    headers: this._headers
    })
    .then(res => this._checkResult(res))
  };

  //Метод получения инициализируемых карточек
  getInitialCards() {
    return fetch(this._baseUrl + 'cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkResult(res))
  };

  //Метод изменения данных пользователя
  setUserInfo(inputValuesObject) {
    return fetch(this._baseUrl + 'users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${inputValuesObject.name}`,
        about: `${inputValuesObject.about}`
      })
    })
    .then(res => this._checkResult(res))
  };

  //Метод добавления новой карточки
  addCard(cardData) {
    return fetch(this._baseUrl + 'cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${cardData.place}`,
        link: `${cardData.url}`
      })
    })
    .then(res => this._checkResult(res))
  };

  //Метод удаления карточки
  deleteCard(cardData) {
    return fetch(this._baseUrl + 'cards/' + cardData._id, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._checkResult(res))
  };

  //Метод установки/снятия лайка
  toggleLikeCard(cardData, isLiked) {
    let method = isLiked ? 'DELETE':'PUT';
    return fetch(this._baseUrl + 'cards/' + cardData._id + '/likes', {
      method: method,
      headers: this._headers,
    })
    .then(res => this._checkResult(res))
  };

  //Метод установки аватара пользователя
  setUserAvatar(avatarData) {
    return fetch(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarData.avatar}`
      })
    })
    .then(res => this._checkResult(res))
  };



}


const apiAuth = new ApiAuth({
  baseUrl: 'https://mesto.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiAuth;