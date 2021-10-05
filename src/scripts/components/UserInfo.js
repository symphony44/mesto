export class UserInfo {
    constructor({ name, description }) {
        this._nameElement = document.querySelector(name);
        this._descriptionElement = document.querySelector(description);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            description: this._descriptionElement.textContent,
        }
    }

    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._descriptionElement.textContent = data.description;
    }
}