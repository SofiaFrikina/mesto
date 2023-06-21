import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._descriptionPopUpAddImage = this._popup.querySelector('.popup__text')
        this._imagePopUpAddImage = this._popup.querySelector('.popup__image');
    }
    open(name, link) {
        this._descriptionPopUpAddImage.textContent = name;
        this._imagePopUpAddImage.src = link;
        this._imagePopUpAddImage.alt = name;
        super.open();
    }
}
