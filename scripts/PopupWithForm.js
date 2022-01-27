
import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
   constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector);
      
      this._popupSelector = popupSelector;
      this._popupElement = document.querySelector(this._popupSelector);
      this._popupForm = this._popupElement.querySelector('.popup__form');
      this._handleFormSubmit = handleFormSubmit;

      //this._getInputValues()
   };

   // _getElement() {
   //    const formElement = document
   //       .querySelector(this._popupSelector);

   //    return formElement;
   // };

   _setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', (evt) => {

         evt.preventDefault();
         this._handleFormSubmit(this._getInputValues());

         this._popupForm.reset();
         super.close();
      })
   }

   _getInputValues() {
      this._inputList = this._popupElement.querySelectorAll('.popup__input');

      this._formValues = {};
      this._inputList.forEach(input => this._formValues[input.name] = input.value);

      return this._formValues;
   }

   generate() {
      this._setEventListeners();
   }

   // generate() {
   //    this._element = this._getElement();
   //    this._setEventListeners();

   //    return this._element;
   // }
}

