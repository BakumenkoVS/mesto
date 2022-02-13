export default class Api {
   constructor({ address, token }) {
      this._address = address;
      this._token = token;

   }

   _handleResponse = (response) => {
      if (response.ok) {
         return response.json();
      }
      return Promise.reject(`Ошибка ${response.status}`)
   }

   getUserInfo() {
      return fetch(`${this._address}users/me`, {
         headers: {
            authorization: this._token
         }
      })
         .then(this._handleResponse)
   }

   getCard() {
      return fetch(`${this._address}cards`, {
         headers: {
            authorization: this._token
         }
      })
         .then(this._handleResponse)
   }

   addCards(data) {
      return fetch(`${this._address}cards`, {
         method: 'POST',
         headers: {
            authorization: this._token,
            "Content-type": 'application/json'
         },
         body: JSON.stringify({
            name: data.name,
            link: data.link
         })
      })
         .then(this._handleResponse);
   }

   addUserInfo(data) {
      return fetch(`${this._address}users/me`, {
         method: 'PATCH',
         headers: {
            authorization: this._token,
            "Content-type": 'application/json'
         },
         body: JSON.stringify({
            name: data.name,
            about: data.about
         })
      })
         .then(this._handleResponse);
   }


   deleteCard(id) {
      return fetch(`${this._address}cards/${id}` , {
         method: 'DELETE',
         headers: {
            authorization: this._token,
         }
      })
      .then(this._handleResponse)
   }
}