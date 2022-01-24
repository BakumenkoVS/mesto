export default class Popup {
   constructor(popupSelector) {
      this._popupType = popupSelector;
   }

   _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
         close(this._popupType);
      }
   }

   open() {
      this._popupType.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
   }

   close() {
      this._popupType.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
   }

   setEventListeners() {
      this._popupType.addEventListener('click', (evt) => {
         if (evt.target.classList.contains('popup__overlay')) {
            close(this._popupType);
         }
         if (evt.target.classList.contains('popup__button-close')) {
            close(this._popupType);
         }
      });
   };

}