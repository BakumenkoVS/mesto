import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

const popupName = document.querySelector('.popup_type_name');
const popupImg = document.querySelector('.popup_type_img');
const popupPicture = document.querySelector('.popup_type_picture');
const popupPictureImg = popupPicture.querySelector('.popup__picture-img');
const popupPictureSubtitle = popupPicture.querySelector('.popup__subtitle');
const editActive = document.querySelector('.profile__edit');
const profileForm = popupName.querySelector('.popup__conteiner');
const nameInput = profileForm.querySelector('.popup__input_value_name');
const professionInput = profileForm.querySelector('.popup__input_value_profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elementsList = document.querySelector('.elements');
const profileButton = document.querySelector('.profile__button');
const formElementImg = popupImg.querySelector('.popup__conteiner_img');
const mestoValue = popupImg.querySelector('.popup__input_value_mesto');
const imageValue = popupImg.querySelector('.popup__input_value_image');


//Переменная массива данных для карточек 
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
const formAdd = document.getElementById('form__add');
const formName = document.getElementById('form__name');
const imgAddFormValidation = new FormValidator(enableValidation, formAdd);
const nameChangeFormValidation = new FormValidator(enableValidation, formName);
nameChangeFormValidation.enableValidation();
imgAddFormValidation.enableValidation();

function createCard(name, link) {
  return (new Card('.template', name, link)).getView();
}

//FIXME: Работает но нужно переделать 
const opa = new Popup('.popup_type_img');
// const popupTypeName = new

//FIXME: Переименовать переменные 
const xr = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card('.template', item, handleCardClick);
    const cardElement = card.getView();
    xr.addItem(cardElement);

  }
}, '.elements');

const copyPopupImg = new PopupWithImage('.popup_type_picture');

function handleCardClick(name, link) {
  debugger
  copyPopupImg.open(name, link);

}

//FIXME: почистить название классов 
const y = new PopupWithForm({
  popupSelector: '.popup_type_img',
  handleFormSubmit: (item) => {

    const cardIMG = new Card('.template', item, handleCardClick);
    const cardElement = cardIMG.getView();
    xr.addItem(cardElement);

  }
});

xr.renderItems();
y.generate();
// y.setEventListeners();

const profileChange = new PopupWithForm({
  popupSelector: '.popup_type_name',
  handleFormSubmit: (item) => {

    const q = new UserInfo({ item });
    q.setUserInfo();
    
    return  q.getUserInfo();
  }
});
profileChange.generate();



//TODO: старый метод добавления карточек на страницу 
// function render() {
//   const html = initialCards.map((item) => {
//     return createCard(item.name, item.link)
//   });
//   elementsList.append(...html);
// }
// render();

//функция для добавления карточек 
// function handleAdd(evt) {
//   evt.preventDefault();
//   const inputText = mestoValue.value;
//   const inputSrc = imageValue.value;
//   elementsList.prepend(createCard(inputText, inputSrc));
//   closePopup(popupImg);
// }


//Функция для открытия popup
// function openPopup(popupType) {
//   popupType.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape);
// }

// //Функция для закрытия popup
// function closePopup(popupType) {
//   popupType.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape);
// }

//функция добавляет возможность закрывать popup нажатием кнопки esc
// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

//Функция присваивает введенные значения value элементам на странице
//И закрывает форму по нажатию на кнопку сохранить 
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = professionInput.value;
//   closePopup(popupName);
// }

// const popups = document.querySelectorAll('.popup')
//Функция закрытия popup по нажатию на крестик и по клику на overlay
// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup__overlay')) {
//       closePopup(popup)
//     }
//     if (evt.target.classList.contains('popup__button-close')) {
//       closePopup(popup)
//     }
//   })
// })

//Далее прописаны считыватели событий 
// profileForm.addEventListener('submit', handleProfileFormSubmit);

//formElementImg.addEventListener('submit', handleAdd);
//Добавляем слушатель на кнопку эдит (открывает popup для изменения title и subtitle)
editActive.addEventListener('click', function () {
  profileChange.open()
  
  
  //   //Делаем кнопку при каждом открытии неактивной
  //   nameChangeFormValidation.resetError();
  //   nameInput.value = profileTitle.textContent;          //присваивание input значения которые в момент 
  //   professionInput.value = profileSubtitle.textContent; //открытия находятся в текстовых значениях title и subtitle
  //   openPopup(popupName); // вызываю функцию открытия popup передавая аргументом тип popup
})

//Добавляем слушатель на кнопку profile__button (открывает popup добавления новых карточек)
profileButton.addEventListener('click', function () {
  opa.open();
  imgAddFormValidation.enableValidation();
});

export {
  popupPicture,
  popupPictureImg,
  popupPictureSubtitle,
  profileTitle,
  profileSubtitle,
  nameInput,
  professionInput
};