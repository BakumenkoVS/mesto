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
} from "../utils/constants.js"

//Пробы  Api

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35/',
  token: '5c1fbf97-83e7-4354-8f50-5549f6898841'
})
//Accepts a data array and returns the drawn cards  
api.getCard()
  .then((data) => {

    const cardRender = new Section({
      items: data,
      renderer: (item) => {
        creationCard(item);

      }
    }, '.elements');
    cardRender.renderItems()
  })
  .catch(err => console.log(err))




const imgAddFormValidation = new FormValidator(validationEnable, formAdd);
const nameChangeFormValidation = new FormValidator(validationEnable, formName);
nameChangeFormValidation.enableValidation();
imgAddFormValidation.enableValidation();

function creationCard(item) {
  const card = new Card('.template', item, handleCardClick);
  const cardElement = card.getView();
  section.addItem(cardElement);
}

const section = new Section({}, '.elements');

const copyPopupImg = new PopupWithImage('.popup_type_picture');
copyPopupImg.setEventListeners();
function handleCardClick(name, link) {
  copyPopupImg.open(name, link);
}




// api.addCars()
//   .then((data) => {
//     const cardRender = new Section({
//       items: data,
//       renderer: (item) => {
//         creationCard(item);

//       }
//     }, '.elements');
//     cardRender.renderItems()
//   })
//   .catch(err => console.log(err))



const cardAdd = new PopupWithForm({
  popupSelector: '.popup_type_img',
  handleFormSubmit: (data) => {

    api.addCards(data)
      .then(result => {
        // creationCard(result);
        // debugger

        const card = new Card({selector: '.template', result, handleCardClick, handleDeleteButtonClick: () => {
          api.deleteCard(card.getId())
          .then(() => card.removeMessage())
          .catch(err => console.log(`Ошибка удаления сообщения: ${err}`))
        }});
        const cardElement = card.getView();
        section.addItem(cardElement);
      })
      .catch(err => console.log(err))
  }

});

// cardRender.renderItems();
cardAdd.setEventListeners();

const formProfile = new UserInfo({ name: '.profile__title', profession: '.profile__subtitle' });
const profileChange = new PopupWithForm({
  popupSelector: '.popup_type_name',
  handleFormSubmit: (formData) => {
    formProfile.setUserInfo(formData);
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

