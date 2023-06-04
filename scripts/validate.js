//валидация
import { FormValidator } from './FormValidator.js';

const validations = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_disabled',
    errorClass: 'popup__text-error_active'
}


/* 
class FormValidator {
    constructor(selectors, formElement) {
        this._formElement = formElement;
        this._formSelector = selectors.formSelector;
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }
    //создаем функцию, которая будет показывать ошибку, если введенный код невалиден
    _showInputError(inputElement, errorMessage) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);//красная подстрока
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    }
    //создаем функцию, которая будет прятать ошибку, если введенный код валиден
    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._errorClass);
    }
    //создаем функцию, которая будет проверять валиден ли код
    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        // проходим массиву
        return this._inputList.some((inputElement) => {
            //если поле не валидно колбэк вернёт true
            return !inputElement.validity.valid;
        });
    }
    inActiveButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }
    _activeButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled', true);
    }
    //создаем функцию, которая принимает массив полей ввода и кнопку
    _toggleButton() {
        if (this._hasInvalidInput()) {
            //кнопка неактивная
            this.inActiveButton();
        } else {
            //кнопка активная
            this._activeButton();
        }
    };
    //создаем функцию, которая позволит слушателю событий добавиться всем полям инпут внутри формы
    _eventListener() {
        this._inputList.forEach(inputElement => {
            // каждому полю добавим обработчик события input
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButton();
            });
        });
        this._toggleButton();
    }
    //создаем функцию, которая найдёт и переберёт все формы на странице
    enableValidation() {
        this._eventListener();

    }
}*/

const formPopUpCards = document.querySelector('.popup__form_type_two');


const formvalidatoring = new FormValidator(validations, formPopUpCards);
formvalidatoring.enableValidation();
export { FormValidator, validations, formPopUpCards, formvalidatoring };


/*
const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_disabled',
    errorClass: 'popup__text-error_active'

}*/


/*

//создаем функцию, которая будет показывать ошибку, если введенный код невалиден
const showInputError = (formElement, inputElement, errorMessage, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);//красная подстрока
    //inputElement.setAttribute('disabled', true);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);

}
//создаем функцию, которая будет прятать ошибку, если введенный код валиден
const hideInputError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    //inputElement.removeAttribute('disabled', true);
    errorElement.textContent = '';
    errorElement.classList.remove(selectors.errorClass);

}

//создаем функцию, которая будет проверять валиден ли код
const isValid = (formElement, inputElement, selectors) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(formElement, inputElement, selectors);
    }
}




const hasInvalidInput = (inputList) => {
    // проходим массиву
    return inputList.some((inputElement) => {
        //если поле не валидно колбэк вернёт true
        return !inputElement.validity.valid;
    });
};

function inActiveButton(buttonElement, selectors) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);

}

function activeButton(buttonElement, selectors) {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
}

//создаем функцию, которая принимает массив полей ввода и кнопку
const toggleButton = (inputList, buttonElement, selectors) => {
    if (hasInvalidInput(inputList, selectors)) {
        //кнопка неактивная
        inActiveButton(buttonElement, selectors)
    } else {
        //кнопка активная
        activeButton(buttonElement, selectors)
    }
};

//создаем функцию, которая позволит слушателю событий добавиться всем полям инпут внутри формы
const eventListener = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    toggleButton(inputList, buttonElement, selectors);
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, selectors);
            toggleButton(inputList, buttonElement, selectors);
        });
    });
}


//создаем функцию, которая найдёт и переберёт все формы на странице
const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        eventListener(formElement, selectors);
    });
}

enableValidation(selectors);*/
