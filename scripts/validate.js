//валидация
const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_disabled',
    errorClass: 'popup__text-error_active'

}




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

enableValidation(selectors);
