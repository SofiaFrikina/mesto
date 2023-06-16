export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', closePopUpEscape);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', closePopUpEscape);
    }
    //закрытие попапов escape
    _handleEscClose() {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    setEventListeners() {

    }
}