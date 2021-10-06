import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhotoPhoto = this._popup.querySelector('.popup-photo__photo');
        this._popupPhotoCaption = this._popup.querySelector('.popup-photo__caption');
    }

    open(data) {
        super.open();
        this._popupPhotoPhoto.src = data.link;
        this._popupPhotoPhoto.alt = data.name;
        this._popupPhotoCaption.textContent = data.name;
    }
}