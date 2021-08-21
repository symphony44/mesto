function showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
}

function hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError (formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError (formElement, inputElement);
    }
};

function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
 
function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_inactive');
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('popup__submit-button_inactive');
        buttonElement.removeAttribute('disabled');
    }
}

function enableValidation () {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();   
        });
        setEventListeners(formElement);
    });
};

enableValidation();

