export default class Card {
    constructor(selector, name, link) {
        this._selector = selector;
        this._name = name;
        this._link = link;
    }
    //метод находит тимплэйт элемент дублирует его часть и возвращает ее 
    _getItem() {
        return document
            .querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }
    //Метод для удаления карточек 
    _handleDeleteCard = () => {
        this._element.remove();
    }
    //Метод для использования кнопки лайка 
    _putLike = (evt) => {
        evt.target.classList.toggle('card__heart_active');
    };
    //метод реализующий открытие большой картинки по клику на маленькую 
    _openBigImg = () => {
        const popupImg = document.querySelector('.popup_type_picture');
        popupImg.querySelector('.popup__subtitle').textContent = this._name;
        const popupPictureImg = popupImg.querySelector('.popup__picture-img');
        popupPictureImg.src = this._link;
        popupPictureImg.alt = this._name;
        popupImg.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeWithEsc);

    }
    //Метод реализующий закрытие popup с большой картинкой 
    _closeBigImg = () => {
        const openedPopup = document.getElementById('img');
        openedPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeWithEsc);
    };
    //Метод для закрытия большой картинки по нажатию на esc
    _closeWithEsc = (evt) => {
        if (evt.key === 'Escape') {
            this._closeBigImg();
        }
    };
    //Публичный метод возвращающий заполненную карточку 
    getView() {
        this._element = this._getItem();
        const cardImg = this._element.querySelector('.card__img');
        cardImg.src = this._link;
        cardImg.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        cardImg.addEventListener('click', this._openBigImg);
        this._element.querySelector('.card__delete').addEventListener('click', this._handleDeleteCard);
        this._element.querySelector('.card__heart').addEventListener('click', this._putLike);

        document.querySelector('.popup_type_picture').addEventListener('click', this._closeBigImg);


        return this._element;
    };
}

