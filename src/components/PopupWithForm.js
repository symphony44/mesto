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

    _setInputValues (data) { 
        Object.keys(data).forEach(name => { 
          const input = this._formElement.querySelector('input[name="description"]');  // Не совсем понял на этой строчке в Вашем коде строку (input[name=${name}]).
          if (input) input.value = data[name];                                          // Я так понял, это jQuery, но не совсем понимаю как её переписать на JS для обоих inputs.
        })                                                                              //
    }

    _submitForm(evt) {
        evt.preventDefault();
        this._formSubmitHandler(this._getInputValues());
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submitFormCb);
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    open(data) { 
        if (data) { 
          this._setInputValues(data); 
        } 
        super.open(); 
    }
}