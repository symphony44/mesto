    export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._escCloseCb = this._escClose.bind(this);
        this._overlayClickCloseCb = this._overlayClickClose.bind(this);
        this._closeCb = this.close.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._escCloseCb);
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _escClose(evt) {
        if (evt.key === 'Escape') {
            this.close(); 
        }
    }

    _overlayClickClose(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this._closeCb);
        this._popup.addEventListener('click', this._overlayClickCloseCb);
    }
}