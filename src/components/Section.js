export class Section { 
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(data) {
        this._items = data.reverse();
        this._items.forEach((item) => {
            this._renderer(item);
          });   
    }

    addItem(element) {
        this._container.prepend(element);
    }
}