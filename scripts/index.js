const editActive = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__conteiner');
const nameInput = formElement.querySelector('.popup__input_value_name');
const professionInput = formElement.querySelector('.popup__input_value_profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardsTemplate = document.querySelector('.template').content;
const elementsList = document.querySelector('.elements');
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

initialCards.forEach(function (element) {
  const cardsElement = cardsTemplate.cloneNode(true);

  cardsElement.querySelector('.card__title').textContent = element.name;
  cardsElement.querySelector('.card__img').src = element.link;

  elementsList.append(cardsElement);
});


// const cardHert = document.querySelectorAll('.card__heart');
// console.log(cardHert);
//  cardHert.addEventListener('click', function (evt) {
//    evt.target.classList.toggle('card__heart_aktiv');
//  });

//Функция открывает popup и записывает инпутам значения введенные в тайтл и субтайтл
const popupOpen = () => {
   popup.classList.add('popup_opened');
   nameInput.value = profileTitle.textContent;
   professionInput.value = profileSubtitle.textContent;
}

//Функция закрывает popup по нажатию на крестик 
const popupClose = () => {
   popup.classList.remove('popup_opened');
}
//Функция присваивает введенык значения value элементам на странице
//И закрывает форму по нажатию на кнопку сохранить 
function formSubmitHandler (evt) {
   evt.preventDefault();
   profileTitle.textContent = nameInput.value;
   profileSubtitle.textContent = professionInput.value;
   popupClose();
}

//Далее прописаны считыватели событий 
formElement.addEventListener('submit', formSubmitHandler);
editActive.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);