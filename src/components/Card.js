export class Card {
    constructor({ card, user, templateSelector, handleClickByImage, removeCard, putLike, removeLike }) {
        this._name = card.name;
        this._link = card.link;
        this._userId = user;
        this._templateSelector = templateSelector;
        this._handleClickByImage = handleClickByImage;
        this._dataLikes = card.likes;
        this.id = card._id;
        this.cardData = card;
        this._countLike = card.likes.length;
        this._removeCard = removeCard;
        this._putLike = putLike;
        this._removeLike = removeLike;
        this._ownerId = card.owner._id;


    }
    //получает шаблон создаваемой карточки
    _getTemplate() {
        const cardElement = document.querySelector('.elements-template').content.querySelector('.element').cloneNode(true);
        return cardElement;

    }
    //вставит данные в разметку и подготовит карточку к публикации
    generateCard() {
        this.element = this._getTemplate();
        this._deleteCardButton = this.element.querySelector('.element__button-close');
        this._likeButton = this.element.querySelector('.element__button');
        this._countLike = this.element.querySelector('.element__count');//
        this.element.querySelector('.element__text').textContent = this._name;
        this._cardImage = this.element.querySelector('.element__image')
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this.amountLike(this.cardData);
        //console.log(this._ownerId, this._currentId);
        if (this._ownerId !== this._userId) {
            this._deleteCardButton.remove();

        }
        this._setEventListeners();
        //console.log(this.id)
        //console.log(this.cardData)
        return this.element;
    }

    //функция проверки наличия лайка
    presenceLike() {
        //return this._dataLikes.map((userInfo) => userInfo._id).includes(this._currentId);
        return this._dataLikes.some(like => like._id === this._userId)
    }

    addLike() {
        if (this.presenceLike()) {
            this._removeLike(this.id);
        } else {
            this._putLike(this.id)

        }
        //this._likeButton.classList.toggle('element_clicked');
    }

    //отображение количества лайков
    amountLike(card) {
        this._dataLikes = card.likes;
        if (this._dataLikes.length === 0) {
            this._countLike.textContent = '0';
        } else {
            this._countLike.textContent = this._dataLikes.length;
        }
        if (this.presenceLike()) {
            this._likeButton.classList.add('element_clicked');
        } else {
            this._likeButton.classList.remove('element_clicked');
        }
    }

    clickRemoveCard() {
        this.element.remove();
        this.element = null;
    }

    _setEventListeners() {

        this._likeButton.addEventListener('click', () => {
            this.addLike();
        });


        this._deleteCardButton.addEventListener('click', () => {
            this._removeCard(this, this.id);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleClickByImage(this._name, this._link);
        });
    }


};