import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        //колбэк сабмита формы
        this._handleFormSubmit = handleFormSubmit;
        this._formObject = {};
        this._buttonSubmit = this._popup.querySelector('.popup__button');
    }
    //собирает данные всех полей формы и вставляет их в объект
    _getInputValues() {
        this._inputList.forEach((input) => {
            this._formObject[input.name] = input.value;
        });
        return this._formObject;
    }

    setInputValues = (data) => {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    preloader(loading, displayText) {
        if (!this._buttonSubmit) return;
        if (loading) {
            this.defaultText = this._buttonSubmit.textContent;
            this._buttonSubmit.textContent = displayText;
        } else {
            this._buttonSubmit.textContent = this.defaultText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        //добавляет обработчик сабмита формы
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
}