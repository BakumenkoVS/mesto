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
const popupImg = document.querySelector('.popup_img')
const profileButton = document.querySelector('.profile__button');
const popupImgCloseButton = popupImg.querySelector('.popup__button-close_img');
const formElementImg = popupImg.querySelector('.popup__conteiner_img');
const elementsCard = cardsTemplate.querySelector('.card');
const cardDelete = cardsTemplate.querySelector('.card__delete');
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

function render() {
  const html = initialCards.map((item) => { return getItem(item); 
  
  });
  elementsList.append(...html);
}
render();
//Функция динамической загрузки карточек на страницу
function getItem (item) {
  const cardsElement = cardsTemplate.cloneNode(true);
  //Присваивание значениям template данных из массива initialCards
  cardsElement.querySelector('.card__title').textContent = item.name;
  cardsElement.querySelector('.card__img').src = item.link;

  const cardHert = cardsElement.querySelector('.card__heart');
  
  cardHert.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__heart_aktiv');
  });

  const cardDelete = cardsElement.querySelector('.card__delete');
  
  cardDelete.addEventListener('click', handleDelete);
  return cardsElement;
};


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

function  handleDelete(evt) {
  const targetEl = evt.target;
  const cardItem = targetEl.closest('.card');
  cardItem.remove();
}

//Функция открывает popup и записывает инпутам значения введенные в тайтл и субтайтл

const popupOpen = (evt) => {
  if (evt.target.classList.contains('profile__edit')) {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    professionInput.value = profileSubtitle.textContent;
  } else {
    popupImg.classList.add('popup_opened');
  }
}


//Функция закрывает popup по нажатию на крестик 
const popupClose = (evt) => {
  if (evt.target.classList.contains('popup__button-close_img'))
    popupImg.classList.remove('popup_opened');
  else
    popup.classList.remove('popup_opened');
}

//Функция присваивает введенык значения value элементам на странице
//И закрывает форму по нажатию на кнопку сохранить 
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = professionInput.value;
  popup.classList.remove('popup_opened');
}


//Далее прописаны считыватели событий 
formElement.addEventListener('submit', formSubmitHandler);
editActive.addEventListener('click', popupOpen);
profileButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupImgCloseButton.addEventListener('click', popupClose);
formElementImg.addEventListener('submit', handleAdd);
