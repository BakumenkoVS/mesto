
export default class Card {
    constructor(selector, item, handleCardClick, handleDeleteButtonClick) {
        this._selector = selector;
        this._name = item.name;
        this._link = item.link;
        this._id = item._id;
        this._like = item.likes.length
        this._ownerId = item.owner._id;
        this._userId = item.bd;
        console.log(item.likes.length)
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        
        
        
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
        this._handleDeleteButtonClick(this._id, this._element);
        
    }


    removeMessage() {
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

    _getUserId() {
        if(this._ownerId != this._userId) {
        
        this._element.querySelector('.card__delete').style.display = "none";
        }
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
        this._likeText = this._element.querySelector('.card__likes');
        this._likeText.textContent = this._like;
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        
        this._element.querySelector('.card__title').textContent = this._name;
        this._setEventListeners();
        this._getUserId();
        return this._element;
    };
}

