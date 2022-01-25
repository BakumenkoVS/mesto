
import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
   constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector);
      this._popupSelector = popupSelector;
      
      this._handleFormSubmit = handleFormSubmit;
      
      // this._getInputValues()
   };

   _setEventListeners() {
      document.querySelector(this._popupSelector).addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._handleFormSubmit(this._getInputValues());
         
         this._popupSelector.reset();
      })
   }

   _getInputValues() {
      const x = document.querySelector(this._popupSelector);
      this._inputList = x.querySelectorAll('.popup__input');

      this._formValues = {};
      this._inputList.forEach(input => this._formValues[input.name , input.link] = input.value);
      console.log(this._formValues)
      
      return this._formValues;
   }
   
}