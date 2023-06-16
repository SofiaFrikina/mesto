import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';

const popUpProfile = document.querySelector('.popup');
const popUpNewCards = document.querySelector('.popup_type_new-element');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubTitle = profile.querySelector('.profile__subtitle');
const formPopUpProfile = document.querySelector('.popup__form_type_one');
const inputNamePopUpProfile = formPopUpProfile.querySelector('.popup__input_type_name');
const inputJobPopUpProfile = formPopUpProfile.querySelector('.popup__input_type_job');
const formPopUpCards = document.querySelector('.popup__form_type_two');
const inputTextPopUpCards = formPopUpCards.querySelector('.popup__input_type_text');
const inputSoursePopUpCards = formPopUpCards.querySelector('.popup__input_type_sourse');

//1 popup
function openPopUp(modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closePopUpEscape);
}

function closePopUp(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopUpEscape);
}

//закрытие попапов escape
function closePopUpEscape(evt) {
    if (evt.key === "Escape") {
        const popUpOpened = document.querySelector('.popup_opened');
        closePopUp(popUpOpened);
    }
}

//закрытие попапов по оверлею
function closePopUpOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopUp(evt.currentTarget);
    }
}
const popUps = Array.from(document.querySelectorAll('.popup'))

popUps.forEach((popUp) => {
    popUp.addEventListener('click', closePopUpOverlay)
})

document.querySelectorAll('.popup__close').forEach(button => {
    const buttonsPopUp = button.closest('.popup');
    button.addEventListener('click', () =>
        closePopUp(buttonsPopUp));
});

editButton.addEventListener('click', function (e) {
    e.preventDefault();
    inputNamePopUpProfile.value = profileTitle.textContent;
    inputJobPopUpProfile.value = profileSubTitle.textContent;
    formvalidatoringProfile.disableButton();
    openPopUp(popUpProfile);
});

function profileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputNamePopUpProfile.value;
    profileSubTitle.textContent = inputJobPopUpProfile.value;
    closePopUp(popUpProfile);
};

formPopUpProfile.addEventListener('submit', profileFormSubmit);

const cardsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content;
const popUpAddImage = document.querySelector('.popup_type_image');

//cards
const elements = [
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

const descriptionPopUpAddImage = popUpAddImage.querySelector('.popup__text');
const imagePopUpAddImage = popUpAddImage.querySelector('.popup__image');


function handleClickByImage(name, link) {
    descriptionPopUpAddImage.textContent = name;
    imagePopUpAddImage.src = link;
    imagePopUpAddImage.alt = name;
    openPopUp(popUpAddImage);
}

//публикация карточек
const createCard = (item) => {
    const card = new Card(item.name, item.link, handleClickByImage, likeCard, removeCard);
    return card.generateCard();
};

function likeCard(card) {
    card.addLike();
}
function removeCard(card) {
    card.clickRemoveCard();
}

const cards = new Section({
    items: elements,
    renderer: (item) => {
        cards.addItem(createCard(item), 'append');
    }
}, '.elements');

cards.renderItems();

function getForm() {
    return {
        name: inputTextPopUpCards.value,
        link: inputSoursePopUpCards.value
    }
}

function newHandleFormSubmit() {
    evt.preventDefault();
    const dataElement = getForm();
    cards.addItem(dataElement, 'prepend');
    closePopUp(popUpNewCards);
}
formPopUpCards.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const dataElement = getForm();
    cards.addItem(dataElement, 'prepend');
    //cards.addItem(createCard(item), 'prepend');


    formPopUpCards.reset();
    formvalidatoringCard.disableButton();
    closePopUp(popUpNewCards);
});

addButton.addEventListener('click', function (e) {
    e.preventDefault();
    openPopUp(popUpNewCards);
});

//валидация
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_disabled',
    errorClass: 'popup__text-error_active'
}

const formvalidatoringProfile = new FormValidator(validationConfig, formPopUpProfile);
formvalidatoringProfile.enableValidation();

const formvalidatoringCard = new FormValidator(validationConfig, formPopUpCards);
formvalidatoringCard.enableValidation();
