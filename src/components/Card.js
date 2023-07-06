export class Card {
    constructor(data, handleClickByImage, removeCard, putLike, removeLike, currentId) {
        this._name = data.name;
        this._link = data.link;
        this._handleClickByImage = handleClickByImage;
        //this._likeCard = likeCard;
        this._removeCard = removeCard;
        this.id = data._id;
        this._currentId = currentId;
        this._dataLikes = data.likes;
        this._putLike = putLike;
        this._removeLike = removeLike;
        this.cardData = data;

    }
    //получает шаблон создаваемой карточки
    _getTemplate() {
        const cardElement = document.querySelector('.elements-template').content.querySelector('.element').cloneNode(true);
        return cardElement;

    }
    //вставит данные в разметку и подготовит карточку к публикации
    generateCard() {
        this.element = this._getTemplate();
        this._likeButton = this.element.querySelector('.element__button');
        this._countLike = this.element.querySelector('.element__count');//
        this.element.querySelector('.element__text').textContent = this._name;
        this._cardImage = this.element.querySelector('.element__image')
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this.amountLike(this.cardData)
        this._setEventListeners();

        return this.element;
    }

    //функция проверки наличия лайка
    presenceLike() {

        return this._dataLikes.some(like => like._id === this._currentId)
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
            this.addLike()
        });

        this._deleteCardButton = this.element.querySelector('.element__button-close');
        this._deleteCardButton.addEventListener('click', () => {
            this._removeCard(this, this.id);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleClickByImage(this._name, this._link);
        });
    }


};