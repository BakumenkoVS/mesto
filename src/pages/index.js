import './index.css';
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
  formRemoval
} from "../utils/constants.js"

const formProfile = new UserInfo({ name: '.profile__title', profession: '.profile__subtitle', avatar: '.profile__avatar' });

let userId = null;
//Пробы  Api

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35/',
  token: '5c1fbf97-83e7-4354-8f50-5549f6898841'
})

Promise.all([api.getCard(), api.getUserInfo()])
  .then(([dataCard, dataUser]) => {
    formProfile.setUserInfo(dataUser);
    formProfile.giveUserId(dataUser._id)
    section.renderItems(dataCard)
  })
  .catch(err => console.log(err))


//Валидация форм
const imgAddFormValidation = new FormValidator(validationEnable, formAdd);
const nameChangeFormValidation = new FormValidator(validationEnable, formName);
const avatarCangeFormValidation = new FormValidator(validationEnable, formAvatar)
nameChangeFormValidation.enableValidation();
imgAddFormValidation.enableValidation();
avatarCangeFormValidation.enableValidation();


//Постановка лайка
const handleCardLike = (card) => {
  if (card.isLiked) {
    api.deleteCardLike(card._id).then((data) => {
      card.addLike(data.likes);
    }).catch((err) => console.log(err));
  } else {
    api.addCardLike(card._id).then((data) => {
      card.addLike(data.likes);
    }).catch((err) => console.log(err));
  }
}


//Функция создания карточки 
function creationCard(item) {

  item.bd = userId;
  const card = new Card(cardsTemplate, item, handleCardClick, handleDeleteButtonClick, handleCardLike, formProfile.getUserId());
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
  handleFormSubmit: () => { }
})



//Функция удаления карточки 
const handleDeleteButtonClick = (id, element) => {
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

//Добавление аватарки
const addAvatars = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {
    addAvatars.renderLoading(true);
    api.addAvatar(data)
      .then(result => {
        formProfile.setUserInfo(result);
        addAvatars.close();
      })
      .catch(err => console.log(err))
      .finally(() => addAvatars.renderLoading(false))
  }

});
addAvatars.setEventListeners();

//Добавление карточки 
const cardAdd = new PopupWithForm({
  popupSelector: '.popup_type_img',
  handleFormSubmit: (data) => {
    cardAdd.renderLoading(true);
    api.addCards(data)
      .then(result => {
        creationCard(result);
        cardAdd.close();
      })
      .catch(err => console.log(err))
      .finally(() => cardAdd.renderLoading(false))
  }
});
cardAdd.setEventListeners();

//Изменение профиля 
const profileChange = new PopupWithForm({
  popupSelector: '.popup_type_name',
  handleFormSubmit: (data) => {
    profileChange.renderLoading(true);
    api.addUserInfo(data)
      .then(result => {
        formProfile.setUserInfo(result);
        profileChange.close();
      })
      .catch(err => console.log(err))
      .finally(() => profileChange.renderLoading(false))
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

