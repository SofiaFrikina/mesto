export class Card {
    constructor(name, link, popupImage) {
        this._name = name;
        this._link = link;
        this._popupImage = popupImage;

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
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._like();
        this._deleteCard();
        this._setEventListenPopupImage();
        return this._element;
    }
    //лайк
    _like() {
        this._likeButton = this._element.querySelector('.element__button');
        this._likeButton.addEventListener('click', () => {
            this._likeButton.classList.toggle('element_clicked');
        });
    }
    //удалить карточку
    _deleteCard() {
        this._deleteCardButton = this._element.querySelector('.element__button-close');
        this._deleteCardButton.addEventListener('click', () => {
            this._element.remove()
        });
    }
    //открытие поп апа изображения по клику на карточку
    _setEventListenPopupImage() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            console.log(this._name, this._link);
            popupImage(this._name, this._link);
        });
    }


};