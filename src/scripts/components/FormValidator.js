class FormValidator {
    constructor(properties, formElement) {
        this._properties = properties;
        this._formElement = formElement;
        this._button = properties.submitButtonSelector;
        this._inactiveButtonClass = properties.inactiveButtonClass;
        this._errorClass = properties.errorClass;
        this._formSelector = properties.formSelector;
        this._inputErrorClass = properties.inputErrorClass;
        this._inputSelector = properties.inputSelector;
        
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._button);
    }
    
    enableValidation () {
            this._formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
            
            this._setEventListeners();
    };

    _showInputError (inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
    
    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState (buttonElement) {
        if (this._hasInvalidInput()) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    resetValidation() {
        this._formElement.reset();
        this._formElement.querySelector(this._button).setAttribute('disabled', true);
        this._formElement.querySelector(this._button).classList.add(this._inactiveButtonClass);
    }

    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError (inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError (inputElement);
        }
    };

    _setEventListeners () {
        this._toggleButtonState(this._buttonElement);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._buttonElement);
            });
        });
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
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

