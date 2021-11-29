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

// function formSubmitHandlerImg(evt) {
//   evt.preventDefault();
//   const mestoValue = popupImg.querySelector('.popup__input_value_mesto');
//   const imageValue = popupImg.querySelector('.popup__input_value_image');
//   initialCards.unshift({
//     name: mestoValue.value,
//     link: imageValue.value
//   });
//   popupImg.classList.remove('popup_opened');
  
// }

//Функция динамической загрузки карточек на страницу
initialCards.forEach(function (element) {
  const cardsElement = cardsTemplate.cloneNode(true);
  //Присваивание значениям template данных из массива initialCards
  cardsElement.querySelector('.card__title').textContent = element.name;
  cardsElement.querySelector('.card__img').src = element.link;
  const cardHert = cardsElement.querySelector('.card__heart');
  cardHert.addEventListener('click', function (evt) {
    //функция оброботчик данных клика по лайку   
    evt.target.classList.toggle('card__heart_aktiv');
  });
  elementsList.append(cardsElement);
});



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

//Функция добовление карточек 
function addCard(x, y) {
  elementsList.insertAdjacentHTML('afterBegin', `
    <article class="card">
      <img src="${y}" alt="Горы в снегу" class="card__img">
      <div class="card__info">
        <h2 class="card__title">
          ${x}
        </h2>
        <button class="card__heart" type="button" aria-label="Лайк"></button>
      </div>
    </article>
  `);
}


//Функция присваивает введенык значения value элементам на странице
//И закрывает форму по нажатию на кнопку сохранить 
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = professionInput.value;
  popup.classList.remove('popup_opened');
}
//Функция для добовления новых карточек на страницу 
function formSubmitHandlerImg(evt) {
  evt.preventDefault();
  const mestoValue = popupImg.querySelector('.popup__input_value_mesto');
  const imageValue = popupImg.querySelector('.popup__input_value_image');
  elementsList.insertAdjacentHTML('afterBegin', `
    <article class="card">
      <img src="${imageValue.value}" alt="Горы в снегу" class="card__img">
      <div class="card__info">
        <h2 class="card__title">
          ${mestoValue.value}
        </h2>
        <button class="card__heart" type="button" aria-label="Лайк"></button>
      </div>
    </article>
  `);
  const cardHert = document.querySelector('.card__heart');
  cardHert.addEventListener('click', function (evt) {
    //функция оброботчик данных клика по лайку   
    evt.target.classList.toggle('card__heart_aktiv');
  });
  popupImg.classList.remove('popup_opened');
}

console.log(initialCards);
//Далее прописаны считыватели событий 
formElement.addEventListener('submit', formSubmitHandler);
editActive.addEventListener('click', popupOpen);
profileButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupImgCloseButton.addEventListener('click', popupClose);
formElementImg.addEventListener('submit', formSubmitHandlerImg);
