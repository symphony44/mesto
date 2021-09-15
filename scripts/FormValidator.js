class FormValidator {
    constructor(properties, formElement) {
        this._properties = properties;
        this._formElement = formElement;
    }
    

    enableValidation () {
            this._formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
            
            this._setEventListeners();
    };

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._properties.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._properties.errorClass);
    }
    
    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._properties.inputErrorClass);
        errorElement.classList.remove(this._properties.errorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._properties.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._properties.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    resetValidation() {
        this._formElement.reset();
        this._formElement.querySelector('.form__submit').setAttribute('disabled', true);
        this._formElement.querySelector('.form__submit').classList.add('popup__button_disabled');
    }

    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError (inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError (inputElement);
        }
    };

    _setEventListeners () {
        const buttonElement = this._formElement.querySelector(this._properties.submitButtonSelector);
        const inputList = Array.from(this._formElement.querySelectorAll(this._properties.inputSelector));
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

}

const validationProperties = {
    formSelector: '.popup__form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
 }

 export { FormValidator, validationProperties };
