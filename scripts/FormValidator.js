export class FormValidator {
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
}
