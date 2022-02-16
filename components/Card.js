
export default class Card {
    constructor(selector, item, handleCardClick, handleDeleteButtonClick, handleCardLike, userID) {
        this._selector = selector;
        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes
        this._id = item._id;
        this._ownerId = item.owner._id;
        this._userId = userID;
        
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleCardLike = handleCardLike;
        this.isLiked = this._likes.some((z) => {return z._id === this._userId
        } );


        
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

    addLike(data) {
        this._like = data.length;
        
        this._likeText.textContent = this._like;
        this.isLiked = !this.isLiked;
        this._putLike();
        
        
    }


    //Метод для использования кнопки лайка 
    _putLike() {
        if(!this.isLiked) {
            
            this._buttonLike.classList.remove('card__heart_active');
        } 
        
        else {
            
            this._buttonLike.classList.add('card__heart_active');
        }
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
        this._buttonLike = this._element.querySelector('.card__heart');
        
        this._buttonLike.addEventListener('click',  () => this._handleCardLike(this));
        
    };

    //Публичный метод возвращающий заполненную карточку 
    getView() {
        this._element = this._getItem();
        this._cardImg = this._element.querySelector('.card__img');
        this._likeText = this._element.querySelector('.card__likes');
        this._likeText.textContent = this._likes.length
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        
        this._element.querySelector('.card__title').textContent = this._name;
        this._setEventListeners();
        this._putLike();
        this._getUserId();
        return this._element;
    };
}

