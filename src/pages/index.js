import './index.css';
import { profile, editButton, profileTitle, profileSubTitle, popUpProfile, formPopUpProfile, inputNamePopUpProfile, inputJobPopUpProfile, popUpNewCards, formPopUpCards, inputTextPopUpCards, inputSoursePopUpCards, elements, addButton, popUpAddImage, validationConfig, buttonAvatar, formPopUpAvatar } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWIthConfirmation } from '../components/PopupWithConfirmation.js';
import { Api } from '../components/Api.js';

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-70',
    headers: {
        authorization: 'c6851ead-6953-413a-a6ee-14ef0893ecb7',
        'Content-Type': "applycation/json"
    }
})

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([data, initialCards]) => {
        //useid = data._id;
        userInfo.setUserAvatar(data.avatar)
        userInfo.setUserInfo(data.name, data.about);
        //cards.renderItems(initialCards, useid);
        cards.renderItems(initialCards.reverse())
    })
    .catch((err) => console.log(err))

const popupAvatar = new PopupWithForm('.popup_type_avatar', {
    handleFormSubmit: (cardData) => {
        api.editAvatar(cardData.url)
            .then((data) => {
                userInfo.setUserAvatar(data.link);
                popupAvatar.close();
            })
            .catch((err) => console.log(err))

    }
})

buttonAvatar.addEventListener('click', function (e) {
    e.preventDefault();
    popupAvatar.open();
    formvalidatoringAvatar.disableButton();
})
popupAvatar.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar'
});

//попап редактирования профиля
const popupUser = new PopupWithForm('.popup', {
    handleFormSubmit: (cardData) => {
        api.editUserInfo(cardData.name, cardData.job)
            .then((data) => {
                userInfo.setUserInfo(data.name, data.job);
                popupUser.close();
            })
            .catch((err) => console.log(err))

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
    const card = new Card(item.name, item.link, handleClickByImage, likeCard, removeCard, item._id);
    return card.generateCard();
};

function likeCard(card) {
    card.addLike();
}

/*const popupUser = new PopupWithForm('.popup', {
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data.name, data.job);
        popupUser.close();
    }
});*/

const popupConfirm = new PopupWIthConfirmation('.popup_type_confirm', handleFormSubmit);


popupConfirm.setEventListeners();

function handleFormSubmit(card) {
    api.deleteCard(card._id)
        .then(() => {
            card.clickRemoveCard();
            popupConfirm.close();
        })
        .catch((err) => console.log(err))
}

function removeCard(card) {
    //card.clickRemoveCard();
    popupConfirm.open();
    popupConfirm.change(() => {
        handleFormSubmit(card);
    })


}

const cards = new Section({
    items: elements,
    renderer: (item) => {
        cards.addItem(createCard(item), 'append');
    }
}, '.elements');

cards.renderItems();

const popupCard = new PopupWithForm('.popup_type_new-element', {
    handleFormSubmit: (cardData) => {
        api.addCards(cardData.name, cardData.link)
            .then((data) => {
                cards.addItem(createCard(data), 'prepend');
                //formPopUpCards.reset();
                //formvalidatoringCard.disableButton();
                popupCard.close();
            })
            .catch((err) => console.log(err));

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

const formvalidatoringAvatar = new FormValidator(validationConfig, formPopUpAvatar);
formvalidatoringAvatar.enableValidation();