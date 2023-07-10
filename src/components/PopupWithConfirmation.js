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
        this.idRemoveCard = id;
        this.card = element;
    }

    showPreloader(loading, displayText) {
        if (!this._buttonConfirm) return;
        if (loading) {
            this.defaultText = this._buttonConfirm.textContent;
            this._buttonConfirm.textContent = displayText;
        } else {
            this._buttonConfirm.textContent = this.defaultText;
        }
    }


    setEventListeners() {
        super.setEventListeners();
        this._buttonConfirm.addEventListener('click', () => {
            this._handleFormSubmit(this.idRemoveCard, this.card);
        });
    }

}