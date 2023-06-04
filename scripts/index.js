import { Card } from './Card'
import { FormValidator, validations, formPopUpCards, formvalidatoring } from './validate'
const popUpProfile = document.querySelector('.popup');
const popUpNewCards = document.querySelector('.popup_type_new-element');
const buttonPopUpNewCards = popUpNewCards.querySelector('.popup__button');
//const popUpTwoButton = popUpTwo.querySelector('.popup__button');

//const popUpContainer = popUp.querySelector('.popup__container');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const buttonClosePopUpProfile = popUpProfile.querySelector('.popup__close');
//const popUpTwoClose = popUpTwo.querySelector('.popup__close');
//const buttonPopUpProfile = popUpProfile.querySelector('.popup__button');

const addButton = profile.querySelector('.profile__add-button');

const profileTitle = profile.querySelector('.profile__title');
const profileSubTitle = profile.querySelector('.profile__subtitle');

//const form = document.querySelector('.popup__form');
//const formInput = form.querySelector('.popup__input');
//const formError = form.querySelector(`.${formInput.id}-error`)
const formPopUpProfile = document.querySelector('.popup__form_type_one');
const inputNamePopUpProfile = formPopUpProfile.querySelector('.popup__input_type_name');
const inputJobPopUpProfile = formPopUpProfile.querySelector('.popup__input_type_job');


//const formPopUpCards = document.querySelector('.popup__form_type_two');
const inputTextPopUpCards = formPopUpCards.querySelector('.popup__input_type_text');
const inputSoursePopUpCards = formPopUpCards.querySelector('.popup__input_type_sourse');
//1 popup

function openPopUp(modal) {
    modal.classList.add('popup_opened');
    modal.addEventListener('click', closePopUpsOverlay);
    document.addEventListener('keydown', closePopUpsEscape);
}

function closePopUp(modal) {
    modal.classList.remove('popup_opened');
    modal.removeEventListener('click', closePopUpsOverlay);
    document.removeEventListener('keydown', closePopUpsEscape);
}

//закрытие попапов escape
function closePopUpsEscape(evt) {
    if (evt.key === "Escape") {
        const popUpOpened = document.querySelector('.popup_opened');
        closePopUp(popUpOpened);
    }
}

//закрытие попапов по оверлею
function closePopUpsOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopUp(evt.currentTarget);
    }
}



document.querySelectorAll('.popup__close').forEach(button => {
    const buttonsPopUp = button.closest('.popup');
    button.addEventListener('click', () =>
        closePopUp(buttonsPopUp));
});

editButton.addEventListener('click', function (e) {
    e.preventDefault();
    inputNamePopUpProfile.value = profileTitle.textContent;
    inputJobPopUpProfile.value = profileSubTitle.textContent;
    openPopUp(popUpProfile);

});

function profileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputNamePopUpProfile.value;
    profileSubTitle.textContent = inputJobPopUpProfile.value;
    //closePopUp();
    closePopUp(popUpProfile);
};

//buttonPopUpProfile.addEventListener('click', profileFormSubmit);
formPopUpProfile.addEventListener('submit', profileFormSubmit);







const elementsList = document.querySelector('.elements');
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



const likeButton = document.querySelector('.element__button');
const imageCard = document.querySelector('.element__image');
const placeCard = document.querySelector('.element__text');
const descriptionPopUpAddImage = popUpAddImage.querySelector('.popup__text');
const imagePopUpAddImage = popUpAddImage.querySelector('.popup__image');


/*class Card {
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


};*/

function popupImage(name, link) {
    descriptionPopUpAddImage.textContent = name;
    imagePopUpAddImage.src = link;
    imagePopUpAddImage.alt = name;
    openPopUp(popUpAddImage);
}



//публикация карточек
const createcard = (item) => {
    const card = new Card(item.name, item.link, popupImage);
    return card.generateCard();
    //document.querySelector('.elements').append(cardElement);
};

//elements.forEach((item) => createcard(item));

const rendercard = (item, position) => {
    switch (position) {
        case 'prepend': elementsList.prepend(createcard(item)); break;
        case 'append': elementsList.append(createcard(item)); break;
        default: elementsList.prepend(createcard(item));
    }
}

elements.forEach((item) => rendercard(item, 'append'));

function getForm() {
    return {
        name: inputTextPopUpCards.value,
        link: inputSoursePopUpCards.value
    }
}

function newHandleFormSubmit(evt) {
    evt.preventDefault();
    const dataElement = getForm();
    rendercard(dataElement, 'prepend');
    closePopUp(popUpNewCards);
}

formPopUpCards.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const dataElement = getForm();
    rendercard(dataElement, 'prepend');
    formPopUpCards.reset();
    //inActiveButton(buttonPopUpNewCards, validations);
    formvalidatoring.inActiveButton();
    closePopUp(popUpNewCards);
});
//formPopUpCards.addEventListener('submit', createCard)



addButton.addEventListener('click', function (e) {
    e.preventDefault();
    openPopUp(popUpNewCards);
});

/*

const createElements = function (element) {
    const elementsElement = elementsTemplate.querySelector('.element').cloneNode(true);
    const imageCard = elementsElement.querySelector('.element__image');
    elementsElement.querySelector('.element__text').textContent = element.name;
    imageCard.src = element.link;
    imageCard.alt = element.name;






    imageCard.addEventListener('click', function (evt) {
        evt.preventDefault();
        //const name = textInput.value;
        //const link = sourseInput.value; s
        descriptionPopUpAddImage.textContent = element.name;
        imagePopUpAddImage.src = element.link;
        imagePopUpAddImage.alt = element.name;
        openPopUp(popUpAddImage);

    });

    return elementsElement;


}


const rendercard = (element, position) => {
    switch (position) {
        case 'prepend': elementsList.prepend(createElements(element)); break;
        case 'append': elementsList.append(createElements(element)); break;
        default: elementsList.prepend(createElements(element));
    }


}

function getForm() {
    return {
        name: inputTextPopUpCards.value,
        link: inputSoursePopUpCards.value
    }
}

elements.forEach((element) => rendercard(element, 'append'));


function newHandleFormSubmit(evt) {
    evt.preventDefault();
    const dataElement = getForm();
    rendercard(dataElement, 'prepend');
    closePopUp(popUpNewCards);
}

formPopUpCards.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const dataElement = getForm();
    rendercard(dataElement, 'prepend');
    formPopUpCards.reset();
    inActiveButton(buttonPopUpNewCards, selectors);
    closePopUp(popUpNewCards);
});*/
