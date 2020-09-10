import {apiConfig} from './Utils.js';

export class API {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }


  _get(url) {
    return fetch(`${this._baseUrl}/${url}`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(this._getResponseData);
  }

  getUserInfo() {
    return this._get('users/me');
  }


  getInitialCards() {
    return this._get('cards');
  }

  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._getResponseData);
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._getResponseData);
  }

  _updateCardLike(cardId, method) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(this._getResponseData);
  }

  likeCard(cardId) {
    return this._updateCardLike(cardId, 'PUT');
  }

  dislikeCard(cardId) {
    return this._updateCardLike(cardId, 'DELETE');
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(this._getResponseData);
  }

  updateUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._getResponseData);
  }
}

const api = new API (apiConfig);

export default api ;