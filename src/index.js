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
    avatarForm
  } from './utils/constants.js';

import { Api } from './components/Api.js';  
import { Card } from './components/Card.js'
import { FormValidator, validationProperties } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupConfirm } from './components/PopupConfirm.js';
import { UserInfo } from './components/UserInfo.js';
import './pages/index.css';
  
const propertiesApi = {
  token: '1158c204-af6b-46c2-99fa-e137ca6a17ac',
  id: 'cohort-28',
  address: 'mesto.nomoreparties.co'
}

const api = new Api(propertiesApi);
const getInfo = api.getUserInfo();
const getCards = api.getInitialCards();

const aboutUser = new UserInfo({
  name: profileName,
  about: profileDescription,
  avatar: profilePhoto
});

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
  renderer: (card) => cardList.addItem(newCard(card))
}, elementList);

// Промисы карточек/юзера ---
getInfo
  .then((data) => {
    aboutUser.setUserInfo(data);
  })

  .catch(err => console.log(err));

getCards
  .then((res) => {
    return res;
  })

  .catch(err => console.log(err));

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    cardList.renderItems(res[1]);
    userId = res[0]._id;
    aboutUser.setUserInfo(res[0]);
  })
  
  .catch(err => console.log(err));
  
// Новая карточка ---
function newCard(item) {
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
  if (!card.likeButton.classList.contains('elements__like-button_active')) {
    const likeCard = api.addLike(cardElement.cardId);
    likeCard
      .then((res) => {
        card.addLikeCard(res.likes.length);
      })

      .catch(err => console.log(err))

  } else {
    const removeLike = api.removeLike(cardElement.cardId);
    removeLike
      .then((res) => {
        card.deleteLikeCard(res.likes.length);
      })

      .catch(err => console.log(err))
  }
  card._toggleButtonLike();
}

// Удаление карточки ---
function removeElement(cardElement) {
  popupToDelete.open({
    formSubmitHandler: () => {
      const cardToDelete = api.deleteCard(cardElement.cardId);
      cardToDelete
        .then(() => {
          cardElement.removeElement();
          popupToDelete.close();
        })

        .catch(err => console.log(err))
    }
  });
}
  
// Popup редактирования профиля ---
const popupEditProfile = new PopupWithForm({
    formSubmitHandler: (item) => {
      const profileApi = api.editProfile(item);
      profileApi
        .then((data) => {
          aboutUser.setUserInfo(data);
          popupEditProfile.close();
        })

        .catch(err => console.log(err));
    }
  }, popupEdit); 

// Popup добавления карточки ---
const popupAddCard = new PopupWithForm({
    formSubmitHandler: (item) => {
       const cardApi = api.addCard(item);
       cardApi
        .then((res) => {
          cardList.addItem(newCard(res));
          popupAddCard.close();
        })

        .catch(err => console.log(err));
    }
  }, popupAdd);

// Popup смены аватарки ---
const popupEditAvatar = new PopupWithForm({
    formSubmitHandler: (item) => {
      const avatarApi = api.editAvatar(item);
      avatarApi
        .then(() => {
          popupEditAvatar.close();
        })

        .catch(err => console.log(err));
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
    popupEditAvatar.open();
    avatarValidate.resetValidation();
  }  
  
// Обработчики
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
avatarButton.addEventListener('click', openPopupAvatar);
  
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
// popupDelete.setEventListeners();
popupEditAvatar.setEventListeners();

  
editProfileValidate.enableValidation();
addCardValidate.enableValidation();
avatarValidate.enableValidation()
  
  