import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        //колбэк сабмита формы
        this._handleFormSubmit = handleFormSubmit;
        this._formObject = {};
    }
    //собирает данные всех полей формы и вставляет их в объект
    _getInputValues() {
        this._inputList.forEach((input) => {
            this._formObject[input.name] = input.value;
        });
        return this._formObject;
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