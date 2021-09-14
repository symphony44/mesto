import { openPopup, popupPhoto } from "./script.js";

export class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.elements__item')
          .cloneNode(true);

        return cardElement;
    }

    _generateCard() {
        this._getTemplate();

        this._elementsItem = this._getTemplate();
        this._elementPhoto = this._elementsItem.querySelector('.elements__photo');
        this._elementName = this._elementsItem.querySelector('.elements__name');
        this._likeButton = this._elementsItem.querySelector('.elements__like-button');
        this._deleteButton = this._elementsItem.querySelector('.elements__delete-button');

        this._elementName.textContent = this._name;
        this._elementPhoto.src = this._link;
        this._elementPhoto.alt = this._name;

        this._setEventListeners();

        return this._elementsItem;
    }
    
    _setEventListeners() {
        this._likeButton.addEventListener('click', this._toggleLike);
        this._elementPhoto.addEventListener('click', () => {this._openCardPhoto(this._link, this._name)});
        this._deleteButton.addEventListener('click', this._removeElement);
    }

    _toggleLike(event) {
        event.target.classList.toggle('elements__like-button_active');
      }

    _removeElement(event) {
        event.target.closest('.elements__item').remove();
      }  

    _openCardPhoto() {
        const popupPhotoPhoto = document.querySelector('.popup-photo__photo');
        const popupPhotoCaption = document.querySelector('.popup-photo__caption');

        popupPhotoPhoto.src  = this._link;
        popupPhotoPhoto.alt = this._name;
        popupPhotoCaption.textContent = this._name;

        openPopup(popupPhoto);
    }

};

