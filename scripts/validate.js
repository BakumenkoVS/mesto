//Функция показа ошибки валидации 
const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) => {
   const errorMessage = form.querySelector(`#${input.id}-error`);
   errorMessage.textContent = errorMessageText;
   errorMessage.classList.add(errorMessageClass);
   input.classList.add(inputErrorClass);
};
//Функция убирает ошибку валидации
const hideError = (form, input, errorMessageClass, inputErrorClass) => {
   const errorMessage = form.querySelector(`#${input.id}-error`);
   errorMessage.textContent = '';
   errorMessage.classList.remove(errorMessageClass);
   input.classList.remove(inputErrorClass);
};
//Функция проверяет валидность input и если хотя бы 1 не валиден выдает true
const hasInvalidinput = (inputs) => {
   return Array.from(inputs).some((el) => !el.validity.valid);
}
//Функция управляет кнопкой сохранения и  в зависимости валидны ли input в форме делает ее активной или не активной 
const toggleButtonError = (inputs, button, inactiveButtonClass) => {
   if(hasInvalidinput(inputs)) {
      button.classList.add(inactiveButtonClass);
      button.disabled = true;
   } else {
      button.classList.remove(inactiveButtonClass);
      button.disabled = false;
   }
};
//Функция с условиями показа ошибки валидации 
const checkIfInputValid = (form, input, { inputErrorClass, errorClass } ) => {
   if(!input.validity.valid) {
      showError(form, input, input.validationMessage, errorClass, inputErrorClass);
   } else {
      hideError(form, input, errorClass, inputErrorClass);
   }
}
//Функция которая собирает все условия проверки объявленные выше и проверяет каждый input
const setInputListeners = (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
   const inputs = form.querySelectorAll(inputSelector);
   const submitButton = form.querySelector(submitButtonSelector);
   toggleButtonError(inputs, submitButton, inactiveButtonClass);
   inputs.forEach((input) => {
      input.addEventListener('input', () => {
         checkIfInputValid(form, input, rest);
         toggleButtonError(inputs, submitButton, inactiveButtonClass);
      });
   });
}
//Функция которая находит все формы и отменяет их стандартное поведение 
//а так же к каждой форме применяет функцию проверки валидности input 
const enableValidation = ({ formSelector, ...rest }) => {
   const forms = document.querySelectorAll(formSelector);

   forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
         event.preventDefault();
      });

      setInputListeners(form, rest);

   });
};

enableValidation({
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
});