export class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
    }
    // возвращает объект с данными пользователя
    getUserInfo() {
        const userObject = {
            inputName: this._nameSelector.textContent,
            inputJob: this._jobSelector.textContent
        }
        return userObject;
    }
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, job) {
        this._nameSelector.textContent = name;
        this._jobSelector.textContent = job;
    }
}