import {popupPicture, openPopup, popupPictureImg, popupPictureSubtitle} from './index.js';
export default class Card {
    constructor(selector, item) {
        this._selector = selector;
        this._name = item.name;
        this._link = item.link;
    }
    //метод находит template элемент дублирует его часть и возвращает ее 
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
        popupPictureSubtitle.textContent = this._name;
        popupPictureImg.src = this._link;
        popupPictureImg.alt = this._name;
        openPopup(popupPicture);
    }
    
    _setEventListeners() {
        this._cardImg.addEventListener('click', this._openBigImg);
        this._element.querySelector('.card__delete').addEventListener('click', this._handleDeleteCard);
        this._element.querySelector('.card__heart').addEventListener('click', this._putLike);
    };

    //Публичный метод возвращающий заполненную карточку 
    getView() {
        this._element = this._getItem();
        this._cardImg = this._element.querySelector('.card__img');
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;
        
        this._setEventListeners();

        return this._element;
    };
}

