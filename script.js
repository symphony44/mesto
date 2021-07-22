let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let inputName = document.querySelector('.popup__input-name');
let inputDescription = document.querySelector('.popup__input-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form');

function popupOpen () {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function popupClose () {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);