let popUp = document.querySelector('.popup');
let popUpContainer = popUp.querySelector('.popup__container');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popUpClose = popUp.querySelector('.popup__close');
let popUpButton = popUp.querySelector('.popup__button');
let popUpForm = popUp.querySelector('.popup__form');

let profileTitle = profile.querySelector('.profile__title');
let profileSubTitle = profile.querySelector('.profile__subtitle');
let nameInput = popUp.querySelector('.popup__input_type_name');
let jobInput = popUp.querySelector('.popup__input_type_job');
//1 popup

editButton.addEventListener('click', function (e) {
    e.preventDefault();
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubTitle.textContent;
    popUp.classList.add('popup_opened');

});

function closePopUpfunction() {
    popUp.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
    closePopUpfunction();
};

popUpButton.addEventListener('click', handleFormSubmit);
popUpClose.addEventListener('click', closePopUpfunction)
popUpForm.addEventListener('submit', handleFormSubmit);


const elementsList = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content;


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



let popUpImg = document.querySelector('.popup-img');




elements.forEach(function (element) {
    const elementsElement = elementsTemplate.querySelector('.element').cloneNode(true);

    elementsElement.querySelector('.element__text').textContent = element.name;
    elementsElement.querySelector('.element__image').src = element.link;
    elementsList.append(elementsElement);

    //удалять карточки
    elementsElement.querySelector('.element__button-close').addEventListener('click', () => {
        elementsElement.remove();
    });

    //ставить лайик
    const elementButton = elementsElement.querySelector('.element__button');
    elementButton.addEventListener('click', () => {
        elementButton.classList.toggle('element_clicked');
    });

    //попап для карточек
    elementsElement.querySelector('.element__image').addEventListener('click', function (evt) {
        evt.preventDefault();
        //const name = textInput.value;
        //const link = sourseInput.value;
        popUpImg.querySelector('.popup-img__text').textContent = element.name;
        popUpImg.querySelector('.popup-img__image').src = element.link;
        popUpImg.querySelector('.popup-img__image').alt = element.link;

        popUpImg.classList.add('popup-img_opened');

        popUpImg.querySelector('.popup-img__button').addEventListener('click', () => {
            popUpImg.classList.remove('popup-img_opened');
        });
    });


});







//2 popup

let popUpTwo = document.querySelector('.popup-two');
let popUpTwoContainer = popUpTwo.querySelector('.popup-two__container');
let popUpTwoClose = popUpTwo.querySelector('.popup-two__close');
let popUpTwoButton = popUpTwo.querySelector('.popup-two__button');
let popUpTwoForm = popUpTwo.querySelector('.popup-two__form');
let textInput = popUpTwo.querySelector('.popup-two__input_type_text');
let sourseInput = popUpTwo.querySelector('.popup-two__input_type_sourse');
let addButton = profile.querySelector('.profile__add-button');
let elementImage = document.querySelector('.element__image');
let elementText = document.querySelector('.element__text');


addButton.addEventListener('click', function (e) {
    e.preventDefault();
    textInput.value = elementText.textContent;
    sourseInput.value = elementImage.src;
    popUpTwo.classList.add('popup-two_opened');

});

function closePopUpTwofunction() {
    popUpTwo.classList.remove('popup-two_opened');
}




function popUpFormSubmit(evt) {
    evt.preventDefault();

    const name = textInput.value;
    const link = sourseInput.value;
    const elementsElement = elementsTemplate.querySelector('.element').cloneNode(true);

    elementsElement.querySelector('.element__text').textContent = name;
    elementsElement.querySelector('.element__image').src = link;
    const addElement = { name, link };

    elementsList.prepend(elementsElement);
    elements.unshift(addElement);

    //удалить новые карточки
    elementsElement.querySelector('.element__button-close').addEventListener('click', () => {
        elementsElement.remove();
    });

    //лайки новым карточкам
    const elementButton = elementsElement.querySelector('.element__button');
    elementButton.addEventListener('click', () => {
        elementButton.classList.toggle('element_clicked');
    });
    //попап для новых карточек
    elementsElement.querySelector('.element__image').addEventListener('click', function (evt) {
        evt.preventDefault();
        const name = textInput.value;
        const link = sourseInput.value;
        popUpImg.querySelector('.popup-img__text').textContent = name;
        popUpImg.querySelector('.popup-img__image').src = link;
        popUpImg.querySelector('.popup-img__image').alt = link;

        popUpImg.classList.add('popup-img_opened');

        popUpImg.querySelector('.popup-img__button').addEventListener('click', () => {
            popUpImg.classList.remove('popup-img_opened');
        });
    });

    closePopUpTwofunction();


};

popUpTwoButton.addEventListener('click', popUpFormSubmit);
popUpTwoClose.addEventListener('click', closePopUpTwofunction)
popUpTwoForm.addEventListener('submit', popUpFormSubmit);

