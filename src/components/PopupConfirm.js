import { Popup } from './Popup.js';

export class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitFormCb = this._submitForm.bind(this);
  }
    
    _submitForm(evt) {
        evt.preventDefault();
        this._formSubmitHandler();
  }
    
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submitFormCb);
  }
    
    open({ formSubmitHandler }) {
        super.open();
        this._formSubmitHandler = formSubmitHandler;
  }
}