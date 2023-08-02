class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  // Проверка ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register = ( name, email, password ) => {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({name, email, password})
    })
  };

  authorize  = ( email, password ) => {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({email, password})
    })
  };

  checkToken = () => {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
  };

  //Метод возвращения информации о пользователе
  // getUserInfo() {
  //   return this._request(`${this._baseUrl}/users/me`, {
  //     method: 'GET',
  //     headers: this._headers,
  //     credentials: 'include'
  //   })
  // }

  //Метод обновления информации о пользователе
  setUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
      credentials: 'include'
    })
  }

  //Метод возвращения сохранённых текущим пользователем фильмов
  getFavoriteMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
  }

  //Метод добавления фильма в сохраненные
  addCard(data) {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include'
    })
  }

  //Метод удаления сохраненного фильма
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/movies/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
  };
}

const mainApi = new MainApi({
  baseUrl: 'https://movies.nb.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;
