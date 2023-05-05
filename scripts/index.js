const popUp = document.querySelector('.popup');
const popUpTwo = document.querySelector('.popup_type_new-element');
//const popUpTwoButton = popUpTwo.querySelector('.popup__button');

//const popUpContainer = popUp.querySelector('.popup__container');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popUpClose = popUp.querySelector('.popup__close');
//const popUpTwoClose = popUpTwo.querySelector('.popup__close');
const popUpButton = popUp.querySelector('.popup__button');

const addButton = profile.querySelector('.profile__add-button');

const profileTitle = profile.querySelector('.profile__title');
const profileSubTitle = profile.querySelector('.profile__subtitle');

const popUpForm = document.querySelector('.popup__form_type_one');
const nameInput = popUpForm.querySelector('.popup__input_type_name');
const jobInput = popUpForm.querySelector('.popup__input_type_job');

const popUpTwoForm = document.querySelector('.popup__form_type_two');
const textInput = popUpTwoForm.querySelector('.popup__input_type_text');
const sourseInput = popUpTwoForm.querySelector('.popup__input_type_sourse');
//1 popup

function openPopUp(modal) {
    modal.classList.add('popup_opened');
}

function closePopUp(modal) {
    modal.classList.remove('popup_opened');
}

document.querySelectorAll('.popup__close').forEach(button => {
    const buttonsPopUp = button.closest('.popup');
    button.addEventListener('click', () =>
        closePopUp(buttonsPopUp));
});

editButton.addEventListener('click', function (e) {
    e.preventDefault();
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubTitle.textContent;
    openPopUp(popUp);

});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
    //closePopUp();
    closePopUp(popUp);
};

popUpButton.addEventListener('click', handleFormSubmit);
popUpForm.addEventListener('submit', handleFormSubmit);

const elementsList = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content;
const popUpImg = document.querySelector('.popup_type_image');


//cards
const elements = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];




const elementImage = document.querySelector('.element__image');
const elementText = document.querySelector('.element__text');
const popUpText = popUpImg.querySelector('.popup__text');
const popUpImage = popUpImg.querySelector('.popup__image');

addButton.addEventListener('click', function (e) {
    e.preventDefault();
    openPopUp(popUpTwo);
});

const createElements = function (element) {

    const elementsElement = elementsTemplate.querySelector('.element').cloneNode(true);
    const elementImage = elementsElement.querySelector('.element__image');
    elementsElement.querySelector('.element__text').textContent = element.name;
    elementImage.src = element.link;
    elementImage.alt = element.name;


    //удалять карточки
    elementsElement.querySelector('.element__button-close').addEventListener('click', () => {
        elementsElement.remove();
    });

    //ставить лайик
    const elementButton = elementsElement.querySelector('.element__button');
    elementButton.addEventListener('click', () => {
        elementButton.classList.toggle('element_clicked');
    });

    elementImage.addEventListener('click', function (evt) {
        evt.preventDefault();
        //const name = textInput.value;
        //const link = sourseInput.value; s
        popUpText.textContent = element.name;
        popUpImage.src = element.link;
        popUpImage.alt = element.name;
        openPopUp(popUpImg);

    });

    return elementsElement;


}


const rendercard = (element, position) => {
    switch (position) {
        case 'prepend': elementsList.prepend(createElements(element)); break;
        case 'append': elementsList.append(createElements(element)); break;
        default: elementsList.prepend(createElements(element));
    }


}

function getForm() {
    return {
        name: textInput.value,
        link: sourseInput.value
    }
}

elements.forEach((element) => rendercard(element, 'append'));


function newHandleFormSubmit(evt) {
    evt.preventDefault();
    const dataElement = getForm();
    rendercard(dataElement, 'prepend');
    closePopUp(popUpTwo);
}

//popUpTwoButton.addEventListener('click', newHandleFormSubmit);
popUpTwoForm.addEventListener('submit', newHandleFormSubmit);
