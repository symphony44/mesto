import { Card } from './Card.js';
import { FormValidator, validationProperties } from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const editButton = document.querySelector('.profile__edit-button');
const popupFormEdit = document.querySelector('#popup__form-edit');
const popupAdd = document.querySelector('.popup-add');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('#popup__form-add');
const popupPhoto = document.querySelector('.popup-photo');
const popupEdit = document.querySelector('.popup-edit');
const popup = document.querySelector('.popup');
const popupCreateButton = document.querySelector('.popup__create-button');
const popups = document.querySelectorAll('.popup')

const editProfileValidate = new FormValidator(validationProperties, popupFormEdit);
const addCardValidate = new FormValidator(validationProperties, addForm);


function createCard(name, link) {
  const card = new Card(name, link, '#element-template');
  const cardElement = card._generateCard();
  return cardElement;
}

const elementList = document.querySelector('.elements__items');

initialCards.forEach(element => elementList.append(createCard(element.name, element.link))); 

function openProfilePopup () {
    openEditPopup(popup);
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function openEditPopup () {
  openPopup(popupEdit);
}

function openAddPopup () {
  openPopup(popupAdd);
}

function closeAddPopup () {
  closePopup(popupAdd);
}

function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscape);
}

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popup);
}

function formAddSubmitHandler (event) {
    event.preventDefault();
    elementList.prepend(createCard(inputPlace.value, inputLink.value));
    closeAddPopup();
    addForm.reset();
    popupCreateButton.classList.add('popup__button_disabled');
    popupCreateButton.disabled = true;
}

function closeEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}



popupFormEdit.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', formAddSubmitHandler);
editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openAddPopup);
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  });
});



editProfileValidate.enableValidation();
addCardValidate.enableValidation();

export { openPopup, popupPhoto };