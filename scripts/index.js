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



