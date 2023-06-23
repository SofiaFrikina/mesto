export class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(jobSelector);
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
}