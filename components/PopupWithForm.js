import Popup from "./Popup.js"
//Класс реализует заполнение элементов страницы информацией из input форм наследуется от Popup
export default class PopupWithForm extends Popup {
   constructor({ popupSelector, handleFormSubmit }) {

      super(popupSelector);
      this._popupSelector = popupSelector;
      this._popupElement = document.querySelector(this._popupSelector);
      this._popupForm = this._popupElement.querySelector('.popup__form');
      this._handleFormSubmit = handleFormSubmit;
      this._inputList = this._popupElement.querySelectorAll('.popup__input');

   };
   //Метод вешает слушатель события на форму по submit отключает привычное поведение функции 
   //и передает переменной функции handleFormSubmit объект с инпутами.
   setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', (evt) => {

         evt.preventDefault();
         this._handleFormSubmit(this._getInputValues());

         this._popupForm.reset();
         super.close();

      })
   }
   //Метод реализует нахождение инпутов в форме найденной по слектору из параметров и возвращает 
   //объект с полученными данными 
   _getInputValues() {

      this._formValues = {};
      this._inputList.forEach(input => this._formValues[input.name] = input.value);

      return this._formValues;
   }

}

