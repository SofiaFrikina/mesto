const popUpProfile = document.querySelector('.popup');
const popUpNewCards = document.querySelector('.popup_type_new-element');
//const popUpTwoButton = popUpTwo.querySelector('.popup__button');

//const popUpContainer = popUp.querySelector('.popup__container');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const buttonClosePopUpProfile = popUpProfile.querySelector('.popup__close');
//const popUpTwoClose = popUpTwo.querySelector('.popup__close');
const buttonPopUpProfile = popUpProfile.querySelector('.popup__button');

const addButton = profile.querySelector('.profile__add-button');

const profileTitle = profile.querySelector('.profile__title');
const profileSubTitle = profile.querySelector('.profile__subtitle');

//const form = document.querySelector('.popup__form');
//const formInput = form.querySelector('.popup__input');
//const formError = form.querySelector(`.${formInput.id}-error`)
const formPopUpProfile = document.querySelector('.popup__form_type_one');
const inputNamePopUpProfile = formPopUpProfile.querySelector('.popup__input_type_name');
const inputJobPopUpProfile = formPopUpProfile.querySelector('.popup__input_type_job');


const formPopUpCards = document.querySelector('.popup__form_type_two');
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

buttonPopUpProfile.addEventListener('click', profileFormSubmit);
formPopUpProfile.addEventListener('submit', profileFormSubmit);


/*
//создаем функцию, которая будет показывать ошибку, если введенный код невалиден
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_disabled');//красная подстрока
    //inputElement.setAttribute('disabled', true);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__text-error_active');

}
//создаем функцию, которая будет прятать ошибку, если введенный код валиден
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_disabled');
    //inputElement.removeAttribute('disabled', true);
    errorElement.textContent = '';
    errorElement.classList.remove('popup__text-error_active');

}

//создаем функцию, которая будет проверять валиден ли код
const isValid = (formElement, inputElement) => {
    if (!formInput.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}



//создаем функцию, которая позволит слушателю событий добавиться всем полям инпут внутри формы
const eventListener = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButton(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButton(inputList, buttonElement);
        });
    });
}

const hasInvalidInput = (inputList) => {
    // проходим массиву
    return inputList.some((inputElement) => {
        //если поле не валидно колбэк вернёт true
        return !inputElement.validity.valid;
    });
};

//создаем функцию, которая принимает массив полей ввода и кнопку
const toggleButton = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        //кнопка неактивная
        buttonElement.classList.add('popup__button_disabled');
        buttonElement.setAttribute('disabled', true);
    } else {
        //кнопка активная
        buttonElement.classList.remove('popup__button_disabled');
        buttonElement.removeAttribute('disabled', true);
    }
};

//создаем функцию, которая найдёт и переберёт все формы на странице
const everyForm = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        eventListener(formElement);
    });
}

everyForm();*/




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




const imageCard = document.querySelector('.element__image');
const placeCard = document.querySelector('.element__text');
const descriptionPopUpAddImage = popUpAddImage.querySelector('.popup__text');
const imagePopUpAddImage = popUpAddImage.querySelector('.popup__image');

addButton.addEventListener('click', function (e) {
    e.preventDefault();
    openPopUp(popUpNewCards);
});

const createElements = function (element) {
    const elementsElement = elementsTemplate.querySelector('.element').cloneNode(true);
    const imageCard = elementsElement.querySelector('.element__image');
    elementsElement.querySelector('.element__text').textContent = element.name;
    imageCard.src = element.link;
    imageCard.alt = element.name;


    //удалять карточки
    elementsElement.querySelector('.element__button-close').addEventListener('click', () => {
        elementsElement.remove();
    });

    //ставить лайик
    const elementButton = elementsElement.querySelector('.element__button');
    elementButton.addEventListener('click', () => {
        elementButton.classList.toggle('element_clicked');
    });

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

//popUpTwoButton.addEventListener('click', newHandleFormSubmit);
formPopUpCards.addEventListener('submit', newHandleFormSubmit);
