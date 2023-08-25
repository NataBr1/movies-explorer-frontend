import { apiMovie } from "../utils/constants";

class MoviesApi {
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

  //Метод получения фильмов
  getMoviesList() {
    return this._request(`${this._baseUrl}`, {
      headers: this._headers
    })
  }
}

const moviesApi = new MoviesApi({
  baseUrl: apiMovie,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;
