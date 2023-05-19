//валидация
const validation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_disabled',
    errorClass: 'popup__text-error_active'

}




//создаем функцию, которая будет показывать ошибку, если введенный код невалиден
const showInputError = (formElement, inputElement, errorMessage, validation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validation.inputErrorClass);//красная подстрока
    //inputElement.setAttribute('disabled', true);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validation.errorClass);

}
//создаем функцию, которая будет прятать ошибку, если введенный код валиден
const hideInputError = (formElement, inputElement, validation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validation.inputErrorClass);
    //inputElement.removeAttribute('disabled', true);
    errorElement.textContent = '';
    errorElement.classList.remove(validation.errorClass);

}

//создаем функцию, которая будет проверять валиден ли код
const isValid = (formElement, inputElement, validation) => {
    if (!formInput.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validation);
    } else {
        hideInputError(formElement, inputElement, validation);
    }
}



//создаем функцию, которая позволит слушателю событий добавиться всем полям инпут внутри формы
const eventListener = (formElement, validation) => {
    const inputList = Array.from(formElement.querySelectorAll(validation.inputSelector));
    const buttonElement = formElement.querySelector(validation.submitButtonSelector);
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
const toggleButton = (inputList, buttonElement, validation) => {
    if (hasInvalidInput(inputList)) {
        //кнопка неактивная
        buttonElement.classList.add(validation.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        //кнопка активная
        buttonElement.classList.remove(validation.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', true);
    }
};

//создаем функцию, которая найдёт и переберёт все формы на странице
const everyForm = (validation) => {
    const formList = Array.from(document.querySelectorAll(validation.formSelector));
    formList.forEach((formElement) => {
        eventListener(formElement);
    });
}

everyForm(validation);
