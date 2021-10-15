export class UserInfo {
    constructor({ name, about, avatar }) {
        this._nameElement = document.querySelector(name);
        this._descriptionElement = document.querySelector(about);
        this._avatarElement = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._descriptionElement.textContent
        }
    }

    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._descriptionElement.textContent = data.about;
        this._avatarElement.src = data.avatar;
        this._id = data.id;
    }
}