import { Popup } from './Popup.js';

export class PopupWIthConfirmation extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        //this._form = this._popup.querySelector('.popup__form');
        this._buttonConfirm = this._popup.querySelector('.popup__button');
    }

    open(element, id) {
        super.open();
        this.idremovecard = id;
        this.card = element;
    }


    setEventListeners() {
        super.setEventListeners();
        this._buttonConfirm.addEventListener('click', () => {
            this._handleFormSubmit(this.idremovecard, this.card);
        });
    }

}