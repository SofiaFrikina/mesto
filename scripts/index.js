const popUp = document.querySelector('.popup');
const popUpTwo = document.querySelector('.popup_type_new-element');
//const popUpTwoButton = popUpTwo.querySelector('.popup__button');

//const popUpContainer = popUp.querySelector('.popup__container');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popUpClose = popUp.querySelector('.popup__close');
//const popUpTwoClose = popUpTwo.querySelector('.popup__close');
const popUpButton = popUp.querySelector('.popup__button');

const addButton = profile.querySelector('.profile__add-button');

const profileTitle = profile.querySelector('.profile__title');
const profileSubTitle = profile.querySelector('.profile__subtitle');

const form = document.querySelector('.popup__form');
const formInput = form.querySelector('.popup__input');
const formError = form.querySelector(`.${formInput.id}-error`)
const popUpForm = document.querySelector('.popup__form_type_one');
const nameInput = popUpForm.querySelector('.popup__input_type_name');
const jobInput = popUpForm.querySelector('.popup__input_type_job');


const popUpTwoForm = document.querySelector('.popup__form_type_two');
const textInput = popUpTwoForm.querySelector('.popup__input_type_text');
const sourseInput = popUpTwoForm.querySelector('.popup__input_type_sourse');
//1 popup

function openPopUp(modal) {
    modal.classList.add('popup_opened');
}

function closePopUp(modal) {
    modal.classList.remove('popup_opened');
}

document.querySelectorAll('.popup__close').forEach(button => {
    const buttonsPopUp = button.closest('.popup');
    button.addEventListener('click', () =>
        closePopUp(buttonsPopUp));
});

editButton.addEventListener('click', function (e) {
    e.preventDefault();
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubTitle.textContent;
    openPopUp(popUp);

});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
    //closePopUp();
    closePopUp(popUp);
};

popUpButton.addEventListener('click', handleFormSubmit);
popUpForm.addEventListener('submit', handleFormSubmit);

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

everyForm();

//закрытие попапов по оверлею и escape
document.querySelectorAll('.popup').forEach((element) => {
    const newPopUp = element.closest('.popup');
    document.addEventListener('keydown', function (event) {
        const key = event.key; // const {key} = event; in ES6+
        if (key === "Escape") {
            closePopUp(newPopUp);
        }
    });
    element.addEventListener("click", (evt) => {
        if (evt.currentTarget === evt.target) {
            closePopUp(newPopUp)
        }
    });
});



const elementsList = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content;
const popUpImg = document.querySelector('.popup_type_image');


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




const elementImage = document.querySelector('.element__image');
const elementText = document.querySelector('.element__text');
const popUpText = popUpImg.querySelector('.popup__text');
const popUpImage = popUpImg.querySelector('.popup__image');

addButton.addEventListener('click', function (e) {
    e.preventDefault();
    openPopUp(popUpTwo);
});

const createElements = function (element) {

    const elementsElement = elementsTemplate.querySelector('.element').cloneNode(true);
    const elementImage = elementsElement.querySelector('.element__image');
    elementsElement.querySelector('.element__text').textContent = element.name;
    elementImage.src = element.link;
    elementImage.alt = element.name;


    //удалять карточки
    elementsElement.querySelector('.element__button-close').addEventListener('click', () => {
        elementsElement.remove();
    });

    //ставить лайик
    const elementButton = elementsElement.querySelector('.element__button');
    elementButton.addEventListener('click', () => {
        elementButton.classList.toggle('element_clicked');
    });

    elementImage.addEventListener('click', function (evt) {
        evt.preventDefault();
        //const name = textInput.value;
        //const link = sourseInput.value; s
        popUpText.textContent = element.name;
        popUpImage.src = element.link;
        popUpImage.alt = element.name;
        openPopUp(popUpImg);

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
        name: textInput.value,
        link: sourseInput.value
    }
}

elements.forEach((element) => rendercard(element, 'append'));


function newHandleFormSubmit(evt) {
    evt.preventDefault();
    const dataElement = getForm();
    rendercard(dataElement, 'prepend');
    closePopUp(popUpTwo);
}

//popUpTwoButton.addEventListener('click', newHandleFormSubmit);
popUpTwoForm.addEventListener('submit', newHandleFormSubmit);
