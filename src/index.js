import {
    profileName,
    profileDescription,
    inputName,
    inputDescription,
    elementList,
    templateSelector,
    popupPhoto,
    popupEdit,
    popupAdd,
    popupFormEdit,
    addForm,
    editButton,
    addButton
  } from './utils/constants.js';

import { initialCards } from './utils/initial-cards.js';
import { Card } from './components/Card.js'
import { FormValidator, validationProperties } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import './pages/index.css';
  
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
  
const cardElement = card.generateCard(item);
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
    }
  }, popupEdit); 
  
const popupAddCard = new PopupWithForm({
    formSubmitHandler: (item) => {
       newCard(item);
    }
  }, popupAdd);
  
function openPopupEdit() {
    const userData = aboutUser.getUserInfo()
    inputName.value = userData.name;
    inputDescription.value = userData.description;
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
  
  