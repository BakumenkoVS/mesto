export default class Popup {
   constructor(popupSelector) {
      this._popupType = document.querySelector(popupSelector);
      this._popupForm = this._popupType.querySelector('.popup__form');

   }

   _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
         this.close(this._popupType);
      }

   }

   open() {
      this._popupType.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);

   }

   close() {
      this._popupType.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      this._popupForm.reset();

   }

   setEventListeners() {

      this._popupType.addEventListener('click', (evt) => {
         if (evt.target.classList.contains('popup__overlay') || evt.target.classList.contains('popup__button-close')) {
            this.close();
         }
      });
   };

}