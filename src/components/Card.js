export class Card {
    constructor({ data, handleCardClick, toggleLike, removeElement }, cardSelector, userId) {
        this.name = data.name;
        this.link = data.link;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._toggleLike = toggleLike;
        this._removeElement = removeElement;
        this._elementsItem = this._getTemplate();
        this._elementPhoto = this._elementsItem.querySelector('.elements__photo');
        this._elementName = this._elementsItem.querySelector('.elements__name');
        this.likeButton = this._elementsItem.querySelector('.elements__like-button');
        this._deleteButton = this._elementsItem.querySelector('.elements__delete-button');
        this._likesCount = this._elementsItem.querySelector('.elements__like-count');
        this._elementsItem.cardId = data._id;
        this._elementsItem.ownerId = data.owner._id;
        this._elementsItem.likes = data.likes;
        this._elementsItem.likesCount = data.likes.length;
        this._likesCount.textContent = data.likes.length;

        if (this._elementsItem.ownerId !== this._userId) {
            this._deleteButton.style.display = 'none';
          }
    }

    ifCardLiked() {
        if (this.likeButton.classList.contains('elements__like-button_active')) {
            return true;
        } else {
            return false;
        }
    }


    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.elements__item')
          .cloneNode(true);

        return cardElement;
    }

    _checkIfLiked() {
        this._elementsItem.likes.forEach(like => {
          if (like._id === this._userId) {
            this.likeButton.classList.add('elements__like-button_active');
          }
        });
      }

    generateCard() {
        this._elementName.textContent = this.name;
        this._elementPhoto.src = this.link;
        this._elementPhoto.alt = this.name;
        
        
        this._checkIfLiked()
        this._setEventListeners();

        return this._elementsItem;
    }

    addLikeCard(likes) {
        this._likesCount.textContent = likes;
    }

    deleteLikeCard(likes) {
        this._likesCount.textContent = likes;
    }

    
    _setEventListeners() {
        this.likeButton.addEventListener('click', this._toggleLike.bind(this));
        this._elementPhoto.addEventListener('click', this._handleCardClick.bind(this));
        this._deleteButton.addEventListener('click', this._removeElement.bind(this));
    }


    toggleButtonLike() {
        this.likeButton.classList.toggle('elements__like-button_active');
    }

    removeElement() {
        this._deleteButton.closest('.elements__item').remove();
    }
};

