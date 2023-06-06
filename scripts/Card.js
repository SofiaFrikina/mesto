export class Card {
    constructor(name, link, handleClickByImage, likeCard, removeCard) {
        this._name = name;
        this._link = link;
        this._handleClickByImage = handleClickByImage;
        this._likeCard = likeCard;
        this._removeCard = removeCard;

    }
    //получает шаблон создаваемой карточки
    _getTemplate() {
        const cardElement = document.querySelector('.elements-template').content.querySelector('.element').cloneNode(true);
        return cardElement;

    }
    //вставит данные в разметку и подготовит карточку к публикации
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__text').textContent = this._name;
        this._cardImage = this._element.querySelector('.element__image')
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
        return this._element;
    }

    addLike() {
        this._likeButton.classList.toggle('element_clicked');
    }

    clickRemoveCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.element__button');
        this._likeButton.addEventListener('click', () => {
            this._likeCard(this);
        });

        this._deleteCardButton = this._element.querySelector('.element__button-close');
        this._deleteCardButton.addEventListener('click', () => {
            this._removeCard(this);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleClickByImage(this._name, this._link);
        });
    }


};