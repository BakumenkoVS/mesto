console.log('louded');

const editActive = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__conteiner');
const nameInput = formElement.querySelector('.popup__name');
const professionInput = formElement.querySelector('.popup__profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');



const open = () => {
   popup.classList.add('popup__opened');
   nameInput.value = profileTitle.textContent;
   professionInput.value = profileSubtitle.textContent;
}

const close = () => {
   popup.classList.remove('popup__opened');
   document.formElement.reset();
}

function formSubmitHandler (evt) {
   evt.preventDefault();
   profileTitle.textContent = nameInput.value;
   profileSubtitle.textContent = professionInput.value;
   popup.classList.remove('popup__opened');
}
formElement.addEventListener('submit', formSubmitHandler);
editActive.addEventListener('click', open);
popupCloseButton.addEventListener('click', close);