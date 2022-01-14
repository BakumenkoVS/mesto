export default class FormValidator {
   constructor(selectors, form) {
      this._form = form;
      this._inputSelector = selectors.inputSelector;
      this._submitButtonSelector = selectors.submitButtonSelector;
      this._inactiveButtonClass = selectors.inactiveButtonClass;
      this._inputErrorClass = selectors.inputErrorClass;
      this._errorClass = selectors.errorClass;
      this._formInputs = this._form.querySelectorAll(this._inputSelector);
      this._submitButton = this._form.querySelector(this._submitButtonSelector);
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
      return Array.from(this._formInputs).some((el) => {
         return !el.validity.valid
      });
   };
   //Функция управляет кнопкой сохранения и  в зависимости валидны ли input в форме делает ее активной или не активной 
   _toggleButtonError = () => {
      if (this._hasInvalidinput()) {
         this._submitButton.classList.add(this._inactiveButtonClass);
         this._submitButton.disabled = true;
      } else {
         this._submitButton.classList.remove(this._inactiveButtonClass);
         this._submitButton.disabled = false;
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

      // this._toggleButtonError(inputs, submitButton);
      this._formInputs.forEach((input) => {
         input.addEventListener('input', () => {
            this._checkIfInputValid(input);
            this._toggleButtonError();
         });
      });
   }

   resetError() {
      const spanError = document.querySelectorAll('.error');
      this._submitButton.classList.add(this._inactiveButtonClass);
      spanError.forEach(function (item) {  // Обходим все элементы массива и присваиваем их textContent пустую строку
         item.textContent = '';
      });
      this._formInputs.forEach(function (item) {  // Обходим все элементы массива и убираем класс ошибки который красил border в красный цвет
         item.classList.remove('popup__input_type_error');
      });
   };

   enableValidation() {


      this._setInputListeners();

   };

};