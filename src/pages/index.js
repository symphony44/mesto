import {
    profileName,
    profileDescription,
    profilePhoto,
    elementList,
    templateSelector,
    popupPhoto,
    popupEdit,
    popupAdd,
    popupFormEdit,
    addForm,
    editButton,
    addButton,
    popupDelete,
    popupAvatar,
    avatarButton,
    avatarForm,
    editSubmitButton,
    avatarSubmitButton,
    addSubmitButton,
    deleteSubmitButton
  } from '../utils/constants.js';

import { propertiesApi } from '../utils/constants.js';  
import { validationProperties } from '../utils/constants.js';
import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

const aboutUser = new UserInfo({
  name: profileName,
  about: profileDescription,
  avatar: profilePhoto
});

const api = new Api(propertiesApi);
const editProfileValidate = new FormValidator(validationProperties, popupFormEdit);
const addCardValidate = new FormValidator(validationProperties, addForm);
const avatarValidate = new FormValidator(validationProperties, avatarForm);
const popupWithImage = new PopupWithImage(popupPhoto);
const popupToDelete = new PopupConfirm(popupDelete);

function handleCardClick(image) {
  popupWithImage.open(image);
}

// Создание секции/карточки ---
const cardList = new Section ({
  renderer: (card) => cardList.addItem(addNewCard(card))
}, elementList);

let userId;

// Промисы карточек/юзера ---
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    userId = res[0]._id;
    cardList.renderItems(res[1]);
    aboutUser.setUserInfo(res[0]);
  })
  
  .catch(err => console.log(err))

// Новая карточка ---
function addNewCard(item) {
    const card = new Card({
      data: item,
      handleCardClick: () => handleCardClick(item),
      toggleLike: () => toggleLike(card, cardElement),
      removeElement: () => removeElement(cardElement)
    }, templateSelector, userId);
  
const cardElement = card.generateCard();
return cardElement;  
}

// Переключение лайка ---
function toggleLike(card, cardElement) {
  if (!card.ifCardLiked()) {
    const likeCard = api.addLike(cardElement.cardId);
    likeCard
      .then((res) => {
        card.addLikeCard(res.likes.length);
        card.toggleButtonLike();
      })

      .catch(err => console.log(err))

  } else {
    const removeLike = api.removeLike(cardElement.cardId);
    removeLike
      .then((res) => {
        card.deleteLikeCard(res.likes.length);
        card.toggleButtonLike();
      })

      .catch(err => console.log(err))
  }
}

console.log()
// Удаление карточки ---
function removeElement(cardElement) {
  popupToDelete.open({
    formSubmitHandler: () => {
      deleteSubmitButton.textContent = 'Удаляем...';
      const cardToDelete = api.deleteCard(cardElement.cardId);
      cardToDelete
        .then(() => {
          cardElement.remove();
          popupToDelete.close();
        })

        .catch(err => console.log(err))

        .finally(() => deleteSubmitButton.textContent = 'Удалить');
    }
  });
}
  
// Popup редактирования профиля ---
const popupEditProfile = new PopupWithForm({
    formSubmitHandler: (item) => {
      editSubmitButton.textContent = 'Сохранение...';
      const profileApi = api.editProfile(item);
      profileApi
        .then((data) => {
          aboutUser.setUserInfo(data);
          popupEditProfile.close();
        })

        .catch(err => console.log(err))

        .finally(() => editSubmitButton.textContent = 'Сохранить')
    }
  }, popupEdit); 

// Popup добавления карточки ---
const popupAddCard = new PopupWithForm({
    formSubmitHandler: (item) => {
       addSubmitButton.textContent = 'Сохранение...';
       const cardApi = api.addCard(item);
       cardApi
        .then((res) => {
          cardList.addItem(addNewCard(res));
          popupAddCard.close();
        })

        .catch(err => console.log(err))

        .finally(() => addSubmitButton.textContent = 'Создать')
    }
  }, popupAdd);

// Popup смены аватарки ---
const popupEditAvatar = new PopupWithForm({
    formSubmitHandler: (item) => {
      avatarSubmitButton.textContent = 'Сохранение...';
      const avatarApi = api.editAvatar(item);
      avatarApi
        .then(() => {
          popupEditAvatar.close();
        })

        .catch(err => console.log(err))

        .finally(() => editSubmitButton.textContent = 'Сохранить');
    }
}, popupAvatar);
  
function openPopupEdit() {
    editProfileValidate.resetValidation();
    popupEditProfile.open(aboutUser.getUserInfo());
  }
  
function openPopupAdd() {
    popupAddCard.open();
    addCardValidate.resetValidation();
  }

function openPopupAvatar() {
    avatarValidate.resetValidation();
    popupEditAvatar.open();
  }  
  
// Обработчики
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
avatarButton.addEventListener('click', openPopupAvatar);
  
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupToDelete.setEventListeners();
popupEditAvatar.setEventListeners();

  
editProfileValidate.enableValidation();
addCardValidate.enableValidation();
avatarValidate.enableValidation();
  