const editActive = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__conteiner');
const nameInput = formElement.querySelector('.popup__input_value_name');
const professionInput = formElement.querySelector('.popup__input_value_profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardsTemplate = document.querySelector('.template').content;
const elementsList = document.querySelector('.elements');
const popupName = document.querySelector('.popup_type_name');
const popupImg = document.querySelector('.popup_type_img');
const popupPicture = document.querySelector('.popup_type_picture');
const profileButton = document.querySelector('.profile__button');
const formElementImg = popupImg.querySelector('.popup__conteiner_img');
const cardDelete = cardsTemplate.querySelector('.card__delete');
const mestoValue = popupImg.querySelector('.popup__input_value_mesto');
const imageValue = popupImg.querySelector('.popup__input_value_image');
const popupCloseButton = document.querySelectorAll('.popup__button-close');
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
//Функция динамической загрузки карточек на страницу
function render() {
  const html = initialCards.map((item) => { return getItem(item);
  });
  elementsList.append(...html);
}
render();
//Функция создания карточек 
function getItem (item) {
  const cardsElement = cardsTemplate.cloneNode(true);
  //Присваивание значениям template данных из массива initialCards
  const cardName = cardsElement.querySelector('.card__title');
  const cardImg = cardsElement.querySelector('.card__img');

  cardName.textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = item.name;
  
  const cardHert = cardsElement.querySelector('.card__heart');
  //Функция проставления лайков 
  cardHert.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__heart_aktiv');
  });

  const cardDelete = cardsElement.querySelector('.card__delete');
  //Считыватель события удаления карточек  
  cardDelete.addEventListener('click', handleDelete);

  const popupPictureImg = document.querySelector('.popup__picture-img');
  //Событие открывает поп ап с увеличенной картинкой и запускает фунцию 
  cardImg.addEventListener('click', function () {
    document.querySelector('.popup__subtitle').textContent = cardName.textContent
    popupPictureImg.src = cardImg.src
    popupPictureImg.alt = cardName.textContent
    popupOpen(popupPicture);
  });
  
  return cardsElement;
};

//функция для добавления карточек 
function handleAdd (evt) {
  evt.preventDefault();
  const inputText = mestoValue.value;
  const inputSrc = imageValue.value;
  const cardItem = getItem({name: inputText, link: inputSrc});
  elementsList.prepend(cardItem);
  mestoValue.value = '';
  imageValue.value = '';
  popupImg.classList.remove('popup_opened');
}

//Функция для удаления карточек
function  handleDelete(evt) {
  const targetEl = evt.target;
  const cardItem = targetEl.closest('.card');
  cardItem.remove();
}

//Функция для открытия попапа
function popupOpen(popupType) {
  popupType.classList.add('popup_opened');
}

//Функция для закрытия попапа
function popupClose(popupType) {
  popupType.classList.remove('popup_opened');
}

//Функция присваивает введенык значения value элементам на странице
//И закрывает форму по нажатию на кнопку сохранить 
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = professionInput.value;
  popup.classList.remove('popup_opened');
}

//Цикл for который на каждую строку массива вешает слушатель закрытия попапа по наатию на крестик 
for (i = 0; i < popupCloseButton.length; i++) {
  popupCloseButton[i].addEventListener('click', function(evt) { 
    popupClose(evt.target.closest('.popup'));
  })
}

//Далее прописаны считыватели событий 
formElement.addEventListener('submit', formSubmitHandler);

formElementImg.addEventListener('submit', handleAdd);
//Добавляем слушатель на кнопку эдит (открывает попап для изменения тайтла и субтайтла)
editActive.addEventListener('click', function() {
  popupOpen(popupName); // вызываю функцию открытия попапа передавая аргументом тип попапа
  nameInput.value = profileTitle.textContent;          //присваивание инпутам значения которые в момент 
  professionInput.value = profileSubtitle.textContent; //открытия находятся в текстовых значениях тайтла и субтайтла
})

//Добавляем слушатель на кнопку profile__button (открывает попап добавления новых карточек)
profileButton.addEventListener('click', function() {
  popupOpen(popupImg);
});