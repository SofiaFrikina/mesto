export class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._buttonClosePopup = this._popup.querySelector('.popup__close')
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    //закрытие попапов escape
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    setEventListeners() {
        this._buttonClosePopup.addEventListener('click', () => {
            this.close();
        })
        //закрытие попапов по оверлею
        this._popup.addEventListener('click', (evt) => {
            if (evt.currentTarget === evt.target) {
                this.close();
            }
        })
    }
}