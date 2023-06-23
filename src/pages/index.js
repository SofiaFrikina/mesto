import './index.css';
import { profile, editButton, profileTitle, profileSubTitle, popUpProfile, formPopUpProfile, inputNamePopUpProfile, inputJobPopUpProfile, popUpNewCards, formPopUpCards, inputTextPopUpCards, inputSoursePopUpCards, elements, addButton, popUpAddImage, validationConfig } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__subtitle'
});

//попап редактирования профиля
const popupUser = new PopupWithForm('.popup', {
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data.name, data.job);
        popupUser.close();
    }
});

editButton.addEventListener('click', function (e) {
    e.preventDefault();
    const data = userInfo.getUserInfo();
    inputNamePopUpProfile.value = data.name;
    inputJobPopUpProfile.value = data.job;
    formvalidatoringProfile.disableButton();
    popupUser.open();
});

/*function profileFormSubmit(data) {
    userInfo.setUserInfo(data.name, data.job);
    popupUser.close();
};*/

popupUser.setEventListeners();






const popupImage = new PopupWithImage('.popup_type_image');

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

const popupCard = new PopupWithForm('.popup_type_new-element', {
    handleFormSubmit: (data) => {
        cards.addItem(createCard(data), 'prepend');
        //formPopUpCards.reset();
        //formvalidatoringCard.disableButton();
        popupCard.close();
    }
});


/*function newHandleFormSubmit(item) {
    //const dataElement = getForm();
    cards.addItem(createCard(item.name, item.link), 'prepend');
    formPopUpCards.reset();
    formvalidatoringCard.disableButton();
    popupCard.close();
}*/

popupCard.setEventListeners();

addButton.addEventListener('click', function (e) {

    formvalidatoringCard.disableButton();
    popupCard.open();
});


const formvalidatoringProfile = new FormValidator(validationConfig, formPopUpProfile);
formvalidatoringProfile.enableValidation();

const formvalidatoringCard = new FormValidator(validationConfig, formPopUpCards);
formvalidatoringCard.enableValidation();
