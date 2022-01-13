export default class FormValidator {
   constructor(selector, form) {
      this._form = form;
      this._inputSelector = selector.inputSelector;
      this._submitButtonSelector = selector.submitButtonSelector;
      this._inactiveButtonClass = selector.inactiveButtonClass;
      this._inputErrorClass = selector.inputErrorClass;
      this._errorClass = selector.errorClass;
   }
   //Функция показа ошибки валидации
   _showError = (input, errorMessageText) => {
      const errorMessage = this._form.querySelector(`#${input.id}-error`);
      errorMessage.textContent = errorMessageText;
      errorMessage.classList.add(this._errorClass);
      input.classList.add(this._inputErrorClass);
   };
   //Функция убирает ошибку валидации
   _hideError = (input) => {
      const errorMessage = this._form.querySelector(`#${input.id}-error`);
      errorMessage.textContent = '';
      errorMessage.classList.remove(this._errorClass);
      input.classList.remove(this._inputErrorClass);
   };
   //Функция проверяет валидность input и если хотя бы 1 не валиден выдает true
   _hasInvalidinput = () => {
      return Array.from(this._form.querySelectorAll('.popup__input')).some((el) => {
         return !el.validity.valid
      });
   };
   //Функция управляет кнопкой сохранения и  в зависимости валидны ли input в форме делает ее активной или не активной 
   _toggleButtonError = (inputs, button) => {
      if (this._hasInvalidinput(inputs)) {
         button.classList.add(this._inactiveButtonClass);
         button.disabled = true;
      } else {
         button.classList.remove(this._inactiveButtonClass);
         button.disabled = false;
      }
   };
   //Функция с условиями показа ошибки валидации
   _checkIfInputValid(input) {
      if (!input.validity.valid) {
         this._showError(input, input.validationMessage);
      } else {
         this._hideError(input);
      }
   };

   //Функция которая собирает все условия проверки объявленные выше и проверяет каждый input
   _setInputListeners() {
      const inputs = this._form.querySelectorAll(this._inputSelector);
      const submitButton = this._form.querySelector(this._submitButtonSelector);
      // this._toggleButtonError(inputs, submitButton);
      inputs.forEach((input) => {
         input.addEventListener('input', () => {
            this._checkIfInputValid(input);
            this._toggleButtonError(inputs, submitButton);
         });
      });
   }

   enableValidation() {


      this._setInputListeners();

   };

};