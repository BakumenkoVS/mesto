
export default class Card {
    constructor(selector, item, handleCardClick, handleDeleteButtonClick) {
        this._selector = selector;
        this._name = item.name;
        this._link = item.link;
        this._id = item._id;
        this._ownerId = item.owner._id;
        this._userId = item.owner;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        console.log(this._ownerId)
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
        this._handleDeleteButtonClick(this._id);
        this._element.remove();
    }


    _removeMessage() {
        this._element.remove();
        this._element = null;
    }

    //Метод для использования кнопки лайка 
    _putLike = (evt) => {
        evt.target.classList.toggle('card__heart_active');
    };

    _openBig = () => {
        this._handleCardClick(this._name, this._link);
    }

    getUserId(id) {
        this._userId = id;
    }

    _setEventListeners() {
        this._cardImg.addEventListener('click', this._openBig);
        this._element.querySelector('.card__delete').addEventListener('click', () => this._handleDeleteCard(this));
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

