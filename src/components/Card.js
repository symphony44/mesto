export class Card {
    constructor({ data, handleCardClick }, cardSelector) {
        this.name = data.name;
        this.link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._elementsItem = this._getTemplate();
        this._elementPhoto = this._elementsItem.querySelector('.elements__photo');
        this._elementName = this._elementsItem.querySelector('.elements__name');
        this._likeButton = this._elementsItem.querySelector('.elements__like-button');
        this._deleteButton = this._elementsItem.querySelector('.elements__delete-button');
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.elements__item')
          .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._elementName.textContent = this.name;
        this._elementPhoto.src = this.link;
        this._elementPhoto.alt = this.name;

        this._setEventListeners();

        return this._elementsItem;
    }
    
    _setEventListeners() {
        this._likeButton.addEventListener('click', this._toggleLike.bind(this));
        this._elementPhoto.addEventListener('click', this._handleCardClick.bind(this));
        this._deleteButton.addEventListener('click', this._removeElement.bind(this));
    }

    _toggleLike(event) {
        event.target.classList.toggle('elements__like-button_active');
      }

    _removeElement(event) {
        event.target.closest('.elements__item').remove();
      }
};

