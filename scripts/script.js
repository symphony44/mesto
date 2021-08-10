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
const closeEditButton = document.querySelector('.popup-edit__close-button');
const closeAddButton = document.querySelector('.popup-add__close-button');
const popupFormEdit = document.querySelector('#popup__form-edit');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const newElement = document.querySelector('#element-template').content
const addForm = document.querySelector('#popup__form-add');
const elements = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup-photo');
const popupContainer = popupPhoto.querySelector('.popup-photo__container');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup-photo__close-button');
const popupPhotoPhoto = popupPhoto.querySelector('.popup-photo__photo');
const popupPhotoCaption = popupPhoto.querySelector('.popup-photo__caption')

function addElement(name, link) { 
  const elementsItem = newElement.querySelector('.elements__item').cloneNode(true); 
  const elementPhoto = elementsItem.querySelector('.elements__photo');
  const elementName = elementsItem.querySelector('.elements__name');
  const likeButton = elementsItem.querySelector('.elements__like-button');
  const deleteButton = elementsItem.querySelector('.elements__delete-button');

  elementName.textContent = name;
  elementPhoto.src = link;

  likeButton.addEventListener('click', toggleLike);
  elementPhoto.addEventListener('click', showPopupImage);
  deleteButton.addEventListener('click', removeElement);
  
  function showPopupImage() {
    popupPhotoOpen();
    popupPhotoPhoto.src = link;
    popupPhotoCaption.textContent = name;
  }
 
  return elementsItem;
  
}

function toggleLike(event) {
  event.target.classList.toggle('elements__like-button_active');
}

function removeElement(event) {
  event.target.closest('.elements__item').remove();
}

const elementList = document.querySelector('.elements__items');

initialCards.forEach(element => elementList.append(addElement(element.name, element.link))); 


function popupOpen () {
    popupEdit.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function popupClose () {
    popupEdit.classList.remove('popup_opened');
}

function popupOpenAdd () {
    popupAdd.classList.add('popup_opened');
}

function popupCloseAdd() {
    popupAdd.classList.remove('popup_opened');
}

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    popupClose();
}

function formAddSubmitHandler (event) {
    event.preventDefault();
    elementList.prepend(addElement(inputPlace.value, inputLink.value));
    popupCloseAdd();
    addForm.reset();
}

function popupPhotoOpen () {
    popupPhoto.classList.add('popup_opened');
}

function popupPhotoClose () {
    popupPhoto.classList.remove('popup_opened');
}


popupFormEdit.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', formAddSubmitHandler);
editButton.addEventListener('click', popupOpen);
closeEditButton.addEventListener('click', popupClose);
addButton.addEventListener('click', popupOpenAdd);
closeAddButton.addEventListener('click', popupCloseAdd);
popupPhotoCloseButton.addEventListener('click', popupPhotoClose);
