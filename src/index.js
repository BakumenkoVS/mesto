// import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import {
  editActive,
  nameInput,
  professionInput,
  profileButton,
  formAdd,
  formName,
  validationEnable,
  cardsTemplate,
  formAvatar,
  avatarOpen,
  imgAddButton,
  avatarAddButton,
  profileAddButton,
  formRemoval
} from "../utils/constants.js"

let userId = null;
//Пробы  Api

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35/',
  token: '5c1fbf97-83e7-4354-8f50-5549f6898841'
})
//Accepts a data array and returns the drawn cards  
api.getCard()
  .then((data) => {

    section.renderItems(data)
  })
  .catch(err => console.log(err))

//Получает данные о пользователе и его id записывает их в поля 
api.getUserInfo()
  .then((data) => {
    
    userId = data._id;
    formProfile.setUserInfo(data)
    return userId = data._id
    
  })
  .catch(err => console.log(err))




//Валидация форм
const imgAddFormValidation = new FormValidator(validationEnable, formAdd);
const nameChangeFormValidation = new FormValidator(validationEnable, formName);
const avatarCangeFormValidation = new FormValidator(validationEnable, formAvatar)
nameChangeFormValidation.enableValidation();
imgAddFormValidation.enableValidation();
avatarCangeFormValidation.enableValidation();

//Функция создания карточки 
function creationCard(item) {
  item.bd = userId;
  const card = new Card(cardsTemplate, item, handleCardClick, handleDeleteButtonClick);
  const cardElement = card.getView();
  section.addItem(cardElement);

}



const section = new Section({ renderer: (data) => creationCard(data) }, '.elements');

const copyPopupImg = new PopupWithImage('.popup_type_picture');
copyPopupImg.setEventListeners();
function handleCardClick(name, link) {
  copyPopupImg.open(name, link);
}

const popupRemoval = new PopupWithForm({
  popupSelector: '.popup_type_removal',
  handleFormSubmit: () => {}
})
const formProfile = new UserInfo({ name: '.profile__title', profession: '.profile__subtitle' , avatar: '.profile__avatar'});


//Функция удаления карточки 
const handleDeleteButtonClick = (id , element) => {
  popupRemoval.open();
  formRemoval.addEventListener('submit', (evt) => {
    evt.preventDefault(evt);
    api.deleteCard(id)
    .catch(err => console.log(`Ошибка удаления сообщения: ${err}`))
    element.remove();
    popupRemoval.close();
  })
  
};
popupRemoval.setEventListeners();

//Доюавление аватарки
const addAvatars = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {
    avatarAddButton.textContent = 'Сохранение...';
    api.addAvatar(data)
      .then(result => {
        formProfile.setUserInfo(result);
      })
      .catch(err => console.log(err))
      .finally(() => avatarAddButton.textContent = 'Сохранить')
  }
  
});
addAvatars.setEventListeners();

//Добавление карточки 
const cardAdd = new PopupWithForm({
  popupSelector: '.popup_type_img',
  handleFormSubmit: (data) => {
    imgAddButton.textContent = 'Сохранение...'
    api.addCards(data)
      .then(result => {
        creationCard(result);
      })
      .catch(err => console.log(err))
      .finally(() => imgAddButton.textContent = 'Создать')
  }
});

cardAdd.setEventListeners();

//изменение профиля 
const profileChange = new PopupWithForm({
  popupSelector: '.popup_type_name',
  handleFormSubmit: (data) => {
    profileAddButton.textContent = 'Сохранение...'
    api.addUserInfo(data)
      .then(result => {
        formProfile.setUserInfo(result);
      })
      .catch(err => console.log(err))
      .finally(() => profileAddButton.textContent = 'Сохранить')
  }
});
profileChange.setEventListeners();

//Добавляем слушатель на кнопку эдит (открывает popup для изменения title и subtitle)
editActive.addEventListener('click', () => {
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



avatarOpen.addEventListener('click', function () {
  addAvatars.open();
  avatarCangeFormValidation.resetError();
})

