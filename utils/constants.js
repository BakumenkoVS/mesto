const popupPicture = document.querySelector('.popup_type_picture');
const popupPictureImg = popupPicture.querySelector('.popup__picture-img');
const popupPictureSubtitle = popupPicture.querySelector('.popup__subtitle');
const editActive = document.querySelector('.profile__edit');
const nameInput = document.querySelector('.popup__input_value_name');
const professionInput = document.querySelector('.popup__input_value_profession');
const profileButton = document.querySelector('.profile__button');
const formAdd = document.getElementById('form__add');
const formName = document.getElementById('form__name');
const formAvatar = document.getElementById('form__avatar');
const cardsTemplate = '.template' ;

const validationEnable = ({
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
   validationEnable,
   formAdd,
   formName,
   cardsTemplate,
   formAvatar
}