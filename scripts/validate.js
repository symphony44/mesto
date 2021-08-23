function showInputError (formElement, inputElement, errorMessage, validationObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationObject.errorClass);
}

function hideInputError (formElement, inputElement, validationObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationObject.inputErrorClass);
    errorElement.classList.remove(validationObject.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement, validationObject) {
    if (!inputElement.validity.valid) {
        showInputError (formElement, inputElement, inputElement.validationMessage, validationObject);
    } else {
        hideInputError (formElement, inputElement, validationObject);
    }
};

function setEventListeners (formElement, validationObject) {
    const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
    const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationObject);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationObject);
            toggleButtonState(inputList, buttonElement, validationObject);
        });
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
 
function toggleButtonState (inputList, buttonElement, validationObject) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationObject.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationObject.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function enableValidation (validationObject) {
    const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationObject);
    });
};

enableValidation({
   formSelector: '.popup__form',
   inputSelector: '.form__input',
   submitButtonSelector: '.form__submit',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
});

