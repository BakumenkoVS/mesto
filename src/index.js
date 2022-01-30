import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  editActive,
  nameInput,
  professionInput,
  profileButton,
  formAdd,
  formName,
  initialCards,
  validationEnable,
} from "../utils/constants.js"

const imgAddFormValidation = new FormValidator(validationEnable, formAdd);
const nameChangeFormValidation = new FormValidator(validationEnable, formName);
nameChangeFormValidation.enableValidation();
imgAddFormValidation.enableValidation();

function creationCard (item) {
  const card = new Card('.template', item, handleCardClick);
  const cardElement = card.getView();
  cardRender.addItem(cardElement);
}

const cardRender = new Section({
  items: initialCards,
  renderer: (item) => {
    creationCard(item);

  }
}, '.elements');

const copyPopupImg = new PopupWithImage('.popup_type_picture');
copyPopupImg.setEventListeners();
function handleCardClick(name, link) {
  copyPopupImg.open(name, link);
}


const cardAdd = new PopupWithForm({
  popupSelector: '.popup_type_img',
  handleFormSubmit: (item) => {

    creationCard(item);

  }
});

cardRender.renderItems();
cardAdd.setEventListeners();

const formProfile = new UserInfo({name: '.profile__title', profession: '.profile__subtitle'});
const profileChange = new PopupWithForm({
  popupSelector: '.popup_type_name',
  handleFormSubmit: (formData) => {
    formProfile.setUserInfo(formData);
  }
});
profileChange.setEventListeners();

//Добавляем слушатель на кнопку эдит (открывает popup для изменения title и subtitle)
editActive.addEventListener('click',  () => {
  
  const info = formProfile.getUserInfo();
  nameInput.value = info.inputName;
  professionInput.value = info.inputProfession;
  profileChange.open()
  nameChangeFormValidation.resetError();
})

//Добавляем слушатель на кнопку profile__button (открывает popup добавления новых карточек)
profileButton.addEventListener('click', function () {
  cardAdd.open();
  imgAddFormValidation.resetError();
});

