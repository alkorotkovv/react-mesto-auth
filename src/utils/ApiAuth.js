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
    .then(response => {
      try {
        if (response.status === 201){
          console.log(response.json())
          return response.json();
        }
        else if (response.status === 400){
          return response.json()
          .then(response => {
            console.log(response);
            if (response.error)
              return (response.error)
            else 
              return ("Некорректно заполнено одно из полей")
          })
          .catch((err) => console.log(err));
        }
        else 
          return ("Что-то пошло не так! Попробуйте ещё раз.");
      } 
      catch(e){
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  }; 

  //Метод логина пользователя
  loginUser(email, password) {
    return fetch(this._baseUrl + '/signin', {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      password: `${password}`,
      email: `${email}`
    })
    })
    .then(response => {
      console.log(response.json())
      try {
        if (response.status === 200){
          return response.json();
        }
        else if (response.status === 400)
          return ("Некорректно заполнено одно из полей");      
        else if (response.status === 401)
          return ("Пользователь с таким email не найден");
        else
        return ("Что-то пошло не так! Попробуйте ещё раз.");
      } 
      catch(e){
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  }; 











}


const apiAuth = new ApiAuth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiAuth;