import './pages/index.css';
import { profile, editButton, profileTitle, profileSubTitle, popUpProfile, formPopUpProfile, inputNamePopUpProfile, inputJobPopUpProfile, popUpNewCards, formPopUpCards, inputTextPopUpCards, inputSoursePopUpCards, elements, addButton, popUpAddImage, validationConfig } from './utils/constants.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';

const userInfo = new UserInfo({
    nameSelector: profileTitle,
    jobSelector: profileSubTitle
});

//попап редактирования профиля
const popupUser = new PopupWithForm(popUpProfile, profileFormSubmit);

editButton.addEventListener('click', function (e) {
    e.preventDefault();
    inputNamePopUpProfile.value = userInfo.getUserInfo().inputName;
    inputJobPopUpProfile.value = userInfo.getUserInfo().inputJob;
    formvalidatoringProfile.disableButton();
    popupUser.open();
});

function profileFormSubmit() {
    userInfo.setUserInfo(inputNamePopUpProfile.value, inputJobPopUpProfile.value);
    popupUser.close();
};

popupUser.setEventListeners();





const popupCard = new PopupWithForm(popUpNewCards, newHandleFormSubmit);
const popupImage = new PopupWithImage(popUpAddImage);

function handleClickByImage(name, link) {
    popupImage.open(name, link);
}

popupImage.setEventListeners();
//публикация карточек
const createCard = (item) => {
    const card = new Card(item.name, item.link, handleClickByImage, likeCard, removeCard);
    return card.generateCard();
};

function likeCard(card) {
    card.addLike();
}
function removeCard(card) {
    card.clickRemoveCard();
}

const cards = new Section({
    items: elements,
    renderer: (item) => {
        cards.addItem(createCard(item), 'append');
    }
}, '.elements');

cards.renderItems();

function getForm() {
    return {
        name: inputTextPopUpCards.value,
        link: inputSoursePopUpCards.value
    }
}

function newHandleFormSubmit() {
    const dataElement = getForm();
    cards.addItem(createCard(dataElement), 'prepend');
    formPopUpCards.reset();
    formvalidatoringCard.disableButton();
    popupCard.close();
}

popupCard.setEventListeners();

addButton.addEventListener('click', function (e) {
    e.preventDefault();
    popupCard.open();
});


const formvalidatoringProfile = new FormValidator(validationConfig, formPopUpProfile);
formvalidatoringProfile.enableValidation();

const formvalidatoringCard = new FormValidator(validationConfig, formPopUpCards);
formvalidatoringCard.enableValidation();
