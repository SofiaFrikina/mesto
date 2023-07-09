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
        'Content-Type': "application/json"
    }
})
let currentUserId;
Promise.all([api.getCards(), api.getUserInfo()])
    .then(([resCard, resUser]) => {
        //useid = data._id;
        currentUserId = resUser._id;
        userInfo.setUserInfo(resUser);
        userInfo.setUserAvatar(resUser);
        cards.renderItems(resCard, currentUserId)
        //userInfo.setUserAvatar(data)
        //userInfo.setUserInfo(data);
        //cards.renderItems(initialCards, useid);
        //cards.renderItems(initialCards.reverse())

    })
    .catch((err) => console.log(err))

const popupAvatar = new PopupWithForm('.popup_type_avatar', {
    handleFormSubmit: (data) => {
        popupAvatar.preloader(true, 'Сохранение...')
        api.editAvatar(data)
            .then((resUser) => {
                userInfo.setUserAvatar(resUser);
                popupAvatar.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                popupAvatar.preloader(false);
            })

    }
})

buttonAvatar.addEventListener('click', function (e) {
    e.preventDefault();
    popupAvatar.open();
    //formvalidatoringAvatar.disableButton();
})
popupAvatar.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar'
});

//попап редактирования профиля
const popupUser = new PopupWithForm('.popup', {
    handleFormSubmit: (data) => {
        popupUser.preloader(true, 'Сохранение...')
        api.editUserInfo(data)
            .then((res) => {
                userInfo.setUserInfo(res);

                popupUser.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                popupUser.preloader(false);
            })

    }
});

editButton.addEventListener('click', function (e) {
    e.preventDefault();
    //const data = userInfo.getUserInfo();
    //inputNamePopUpProfile.value = data.name;
    //inputJobPopUpProfile.value = data.about;
    //formvalidatoringProfile.disableButton();
    popupUser.open();
    popupUser.setInputValues(userInfo.getUserInfo())
});

/*function profileFormSubmit(data) {
    userInfo.setUserInfo(data.name, data.job);
    popupUser.close();
};*/

popupUser.setEventListeners();






const popupImage = new PopupWithImage('.popup_type_image');



popupImage.setEventListeners();
//публикация карточек
const createCard = (data, user) => {
    const card = new Card({
        card: data,
        user: user,
        templateSelector: '.elements-template',
        handleClickByImage: (name, link) => {
            popupImage.open(name, link);
        },
        removeCard: (id, element) => {
            popupConfirm.open(id, element);
        },
        putLike: (id) => {
            api.likeCard(id)
                .then((res) => {
                    card.amountLike(res);
                })
                .catch((err) => console.log(err))
        },
        removeLike: (id) => {
            api.deleteLike(id)
                .then((res) => {
                    card.amountLike(res);
                })
                .catch((err) => console.log(err))
        }
    });
    return card.generateCard();
};





/*const popupUser = new PopupWithForm('.popup', {
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data.name, data.job);
        popupUser.close();
    }
});*/

const popupConfirm = new PopupWIthConfirmation('.popup_type_confirm', {
    handleFormSubmit: (idremovecard, card) => {
        api.deleteCard(idremovecard)
            .then(() => {
                card.clickRemoveCard();
                popupConfirm.close();
            })
            .catch((err) => console.log(err))
    }
});


popupConfirm.setEventListeners();



const cards = new Section({
    renderer: (item, userId) => {
        cards.addItem(createCard(item, userId), 'prepend');
    },
}, '.elements'
);

//cards.renderItems();

const popupCard = new PopupWithForm('.popup_type_new-element', {
    handleFormSubmit: (item) => {
        popupCard.preloader(true, 'Сохранение...')
        api.addCards(item)
            .then((card) => {

                cards.addItem(createCard(card, currentUserId));
                //formPopUpCards.reset();
                formvalidatoringCard.disableButton();
                popupCard.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                popupCard.preloader(false);
            })

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

addButton.addEventListener('click', function (evt) {
    evt.preventDefault
    //formvalidatoringCard.disableButton();
    popupCard.open();
});


const formvalidatoringProfile = new FormValidator(validationConfig, formPopUpProfile);
formvalidatoringProfile.enableValidation();

const formvalidatoringCard = new FormValidator(validationConfig, formPopUpCards);
formvalidatoringCard.enableValidation();

const formvalidatoringAvatar = new FormValidator(validationConfig, formPopUpAvatar);
formvalidatoringAvatar.enableValidation();