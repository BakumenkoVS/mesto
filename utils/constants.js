const popupPicture = document.querySelector('.popup_type_picture');
const popupPictureImg = popupPicture.querySelector('.popup__picture-img');
const popupPictureSubtitle = popupPicture.querySelector('.popup__subtitle');
const editActive = document.querySelector('.profile__edit');
const nameInput = document.querySelector('.popup__input_value_name');
const professionInput = document.querySelector('.popup__input_value_profession');
const profileButton = document.querySelector('.profile__button');
const formAdd = document.getElementById('form__add');
const formName = document.getElementById('form__name');
const initialCards = [
   {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
];
const enableValidation = ({
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
});


export {
   popupPictureImg,
   popupPictureSubtitle,
   editActive,
   nameInput,
   professionInput,
   profileButton,
   initialCards,
   enableValidation,
   formAdd,
   formName
}