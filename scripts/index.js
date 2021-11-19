const editActive = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__conteiner');
const nameInput = formElement.querySelector('.popup__input_value_name');
const professionInput = formElement.querySelector('.popup__input_value_profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


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