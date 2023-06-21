//секция редактирования профиля
export const profile = document.querySelector('.profile');
export const editButton = profile.querySelector('.profile__edit-button');
export const profileTitle = profile.querySelector('.profile__title');
export const profileSubTitle = profile.querySelector('.profile__subtitle');

//попап редактирования профиля
export const popUpProfile = document.querySelector('.popup');
export const formPopUpProfile = document.querySelector('.popup__form_type_one');
export const inputNamePopUpProfile = formPopUpProfile.querySelector('.popup__input_type_name');
export const inputJobPopUpProfile = formPopUpProfile.querySelector('.popup__input_type_job');

//попап добавления карточек
export const popUpNewCards = document.querySelector('.popup_type_new-element');
export const formPopUpCards = document.querySelector('.popup__form_type_two');
export const inputTextPopUpCards = formPopUpCards.querySelector('.popup__input_type_text');
export const inputSoursePopUpCards = formPopUpCards.querySelector('.popup__input_type_sourse');

//секция карточек
export const elements = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const cardsContainer = document.querySelector('.elements');
export const elementsTemplate = document.querySelector('.elements-template').content;
export const addButton = profile.querySelector('.profile__add-button');

//попап картинки 
export const popUpAddImage = document.querySelector('.popup_type_image');

//валидация
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_disabled',
    errorClass: 'popup__text-error_active'
}
