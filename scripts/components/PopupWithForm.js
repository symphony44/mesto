import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor( {formSubmitHandler}, popupSelector) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._formSubmitHandler = formSubmitHandler;
        this._submitFormCb = this._submitForm.bind(this);
        this._inputList = this._formElement.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._inputs = {};
        this._inputList.forEach(input => {
            this._inputs[input.name] = input.value;
        });

        return this._inputs;
    }

    setInputValues(data) {
        this._getInputValues();
        Object.assign(this._inputs, data);
        this._inputList.forEach(input => {
            input.value = this._inputs[input.name];
        });
    }

    _submitForm(evt) {
        evt.preventDefault();
        this._formSubmitHandler(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submitFormCb);
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}