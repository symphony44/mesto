import {
  profileName,
  profileDescription,
  elementList,
  templateSelector,
  popupPhoto,
  popupEdit,
  popupAdd,
  popupFormEdit,
  addForm,
  editButton,
  addButton
} from './components/constants.js';

import { Card } from './Card.js';
import { FormValidator, validationProperties } from './FormValidator.js';
import { initialCards } from './initial-cards.js';
import { Section } from './components/section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';

const editProfileValidate = new FormValidator(validationProperties, popupFormEdit);
const addCardValidate = new FormValidator(validationProperties, addForm);
const popupWithImage = new PopupWithImage(popupPhoto);

function handleCardClick(image) {
  popupWithImage.open(image);
}

// Создание секции/карточки
const cardList = new Section ({
  items: initialCards,
  renderer: (card) => newCard(card)
}, elementList);

cardList.renderItems();

function newCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => handleCardClick(item)
  }, templateSelector);

  const cardElement = card._generateCard(item);
  cardList.addItem(cardElement);
}
// Юзеринфо
const aboutUser = new UserInfo({
  name: profileName,
  description: profileDescription,
});

// Новые формы
const popupEditProfile = new PopupWithForm({
  formSubmitHandler: (item) => {
    aboutUser.setUserInfo(item);
    popupEditProfile.close();
  }
}, popupEdit); 

const popupAddCard = new PopupWithForm({
  formSubmitHandler: (item) => {
     newCard(item);
     popupAddCard.close();
  }
}, popupAdd);

function openPopupEdit() {
  popupEditProfile.setInputValues(aboutUser.getUserInfo());
  editProfileValidate.resetValidation();
  popupEditProfile.open();
}

function openPopupAdd() {
  popupAddCard.open();
  addCardValidate.resetValidation();
}

// Обработчики
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

editProfileValidate.enableValidation();
addCardValidate.enableValidation();

