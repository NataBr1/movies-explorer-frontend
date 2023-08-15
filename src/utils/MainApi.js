class MainApi {
  constructor(options) {
    this._myUrl = options.myUrl;
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

  // Метод регистрации
  register = (name, email, password) => {
    return this._request(`${this._myUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, email, password })
    })
  };

  //Метод авторизации
  authorize  = ({ email, password }) => {
    return this._request(`${this._myUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
  };

  checkToken = () => {
    return this._request(`${this._myUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
  };

  //Метод возвращения информации о пользователе
  getUserInfo() {
    return this._request(`${this._myUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
  }

  //Метод обновления информации о пользователе
  setUserInfo(data) {
    return this._request(`${this._myUrl}/users/me`, {
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
    return this._request(`${this._myUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
  }

  //Метод добавления фильма в сохраненные
  addCard(selectMovie) {
    return this._request(`${this._myUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: selectMovie.country,
        director: selectMovie.director,
        duration: selectMovie.duration,
        year: selectMovie.year,
        description: selectMovie.description,
        image: `https://api.nomoreparties.co${selectMovie.image.url}`,
        thumbnail: `https://api.nomoreparties.co${selectMovie.image.formats.thumbnail.url}`,
        trailerLink: selectMovie.trailerLink,
        movieId: selectMovie.id,
        nameRU: selectMovie.nameRU,
        nameEN: selectMovie.nameEN,
      }),
      credentials: 'include'
    })
  }

  //Метод удаления сохраненного фильма
  deleteCard(movieId) {
    return this._request(`${this._myUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
  };
}

const mainApi = new MainApi({
  myUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;
