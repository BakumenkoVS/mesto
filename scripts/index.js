console.log('louded');

const editActive = document.querySelector('.profile__edit_type_active');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__button-close');
const open = () => {
   popup.classList.add('popup__opened');
}
const close = () => {
   popup.classList.remove('popup__opened');
}

editActive.addEventListener('click', open);
popupCloseButton.addEventListener('click', close);