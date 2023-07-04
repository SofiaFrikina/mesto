export class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(jobSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }
    // возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileJob.textContent
        }

    }
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, job) {
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
    }

    setUserAvatar(link) {
        this._profileAvatar.src = link;
    }
}