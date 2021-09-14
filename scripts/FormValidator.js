class FormValidator {
    constructor(properties, formElement) {
        this._properties = properties;
        this._formElement = formElement;
    }
    

    enableValidation () {
        const formList = Array.from(document.querySelectorAll(this._properties.formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
            this._setEventListeners(formElement);
        });
    };

    _showInputError (formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._properties.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._properties.errorClass);
    }
    
    _hideInputError (formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._properties.inputErrorClass);
        errorElement.classList.remove(this._properties.errorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState (inputList) {
        const buttonElement = this._formElement.querySelector(this._properties.submitButtonSelector);
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._properties.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._properties.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _checkInputValidity (formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError (formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError (formElement, inputElement);
        }
    };

    _setEventListeners (formElement) {
        const buttonElement = formElement.querySelector(this._properties.submitButtonSelector);
        const inputList = Array.from(formElement.querySelectorAll(this._properties.inputSelector));
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
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
