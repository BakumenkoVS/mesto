export default class Card {
    constructor(selector, name, link){
        this._selector = selector;
        this._name = name;
        this._link = link;
        
        
    }

    _getItem() { 
        return document
            .querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    _handleDeleteCard = () => {
        this._element.remove();
    }

    _cardHert = (evt) => {
        evt.target.classList.toggle('card__heart_aktiv');
    };
    
    getView() {
        this._element = this._getItem();
        this._element.querySelector('.card__img').src = this._link;
        this._element.querySelector('.card__title').textContent = this._name;

        
        this._element.querySelector('.card__delete').addEventListener('click', this._handleDeleteCard);
        this._element.querySelector('.card__heart').addEventListener('click', this._cardHert);
        
        return this._element
    };
}

