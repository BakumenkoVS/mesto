const editActive = document.querySelector('.profile__edit');
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
const buttonName = document.querySelector('.popup__button_type_name');
const buttonImg = document.querySelector('.popup__button_type_img');

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
  //Событие открывает поп ап с увеличенной картинкой и запускает функцию 
  cardImg.addEventListener('click', function () {
    document.querySelector('.popup__subtitle').textContent = cardName.textContent
    popupPictureImg.src = cardImg.src
    popupPictureImg.alt = cardName.textContent
    openPopup(popupPicture);
  });
  
  return cardsElement;
};

//Функция динамической загрузки карточек на страницу
function render() {
  const html = initialCards.map((item) => { return getItem(item);
  });
  elementsList.append(...html);
}
render();

//функция для добавления карточек 
function handleAdd (evt) {
  evt.preventDefault();
  const inputText = mestoValue.value;
  const inputSrc = imageValue.value;
  const cardItem = getItem({name: inputText, link: inputSrc});
  elementsList.prepend(cardItem);
  closePopup(popupImg);
  mestoValue.value = '';
  imageValue.value = '';
}

//Функция удалят сообщения об ошибках из формы 
function resetError () {
  const spanError = document.querySelectorAll('.error');
  const popupInput = document.querySelectorAll('.popup__input');
  spanError.forEach(function(item){  // Обходим все элементы массива и присваиваем их textContent пустую строку
    item.textContent = '';
  });
  popupInput.forEach(function(item){  // Обходим все элементы массива и убираем класс ошибки который красил border в красный цвет
    item.classList.remove('popup__input_type_error');
  });
}

//Функция для удаления карточек
function  handleDelete(evt) {
  const targetEl = evt.target;
  const cardItem = targetEl.closest('.card');
  cardItem.remove();
}

//Функция для открытия popup
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
}

//Функция для закрытия popup
function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
}

//Функция присваивает введенные значения value элементам на странице
//И закрывает форму по нажатию на кнопку сохранить 
function submitFormHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = professionInput.value;
  closePopup(popupName);
}

//Цикл for который на каждый элемент массива вешает слушатель закрытия popup по нажатию на крестик 
for (i = 0; i < popupCloseButton.length; i++) {
  popupCloseButton[i].addEventListener('click', function(evt) { 
    closePopup(evt.target.closest('.popup'));
    resetError ();
  })
}

const popupOverlay = document.querySelectorAll('.popup__overlay')
//Цикл for который на каждый элемент массива вешает слушатель закрытия popup по нажатию за приделы формы
for (i = 0; i < popupOverlay.length; i++) {
  popupOverlay[i].addEventListener('click', function(evt) { 
    closePopup(evt.target.closest('.popup'));
    resetError ();
  })
}


//функция добавляет возможность закрывать popup нажатием кнопки esc
function escapePopup () {
  const popup = document.querySelectorAll('.popup'); //Присваиваем переменной popup массив хранящий в себе все элементы с классом "popup"
  popup.forEach(function(item){
    if(item.classList.contains('popup_opened')){ //Если у элемента массива есть класс popup_opened
      item.classList.remove('popup_opened');     // то мы его удаляем 
    }
  });
};

//Функция закрытия popup нажатием на клавишу esc 
document.addEventListener('keydown', function(evt){
  if(evt.key === 'Escape') {
    escapePopup();
    resetError ();
  }
})


//Далее прописаны считыватели событий 
formElement.addEventListener('submit', submitFormHandler);

formElementImg.addEventListener('submit', handleAdd);
//Добавляем слушатель на кнопку эдит (открывает popup для изменения title и subtitle)
editActive.addEventListener('click', function() {
  buttonName.classList.add('popup__button_disabled'); //Делаем кнопку при каждом открытии неактивной
  buttonName.disabled = true;
  nameInput.value = profileTitle.textContent;          //присваивание input значения которые в момент 
  professionInput.value = profileSubtitle.textContent; //открытия находятся в текстовых значениях title и subtitle
  openPopup(popupName); // вызываю функцию открытия popup передавая аргументом тип popup
})

//Добавляем слушатель на кнопку profile__button (открывает popup добавления новых карточек)
profileButton.addEventListener('click', function() {
  buttonImg.classList.add('popup__button_disabled'); //Делаем кнопку при каждом открытии неактивной 
  buttonImg.disabled = true;
  openPopup(popupImg);
  mestoValue.value = '';
  imageValue.value = '';
});