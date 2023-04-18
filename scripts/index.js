let popUp = document.querySelector('.popup');
let popUpContainer = popUp.querySelector('.popup__container');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popUpClose = popUp.querySelector('.popup__close');
let popUpButton = popUp.querySelector('.popup__button');

editButton.addEventListener('click', function (e) {
    e.preventDefault();
    popUp.classList.add('active');
    popUpContainer.classList.add('active');
});

popUpClose.addEventListener('click', () => {
    popUp.classList.remove('active');
    popUpContainer.classList.remove('active');
});


function handleFormSubmit(evt) {
    evt.preventDefault();
    let profileTitle = profile.querySelector('.profile__title');
    let profileSubTitle = profile.querySelector('.profile__subtitle');
    let nameInput = popUp.querySelector('.popup__input_type_name');
    let jobInput = popUp.querySelector('.popup__input_type_job');


    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;


};

popUpButton.addEventListener('click', handleFormSubmit);

popUp.addEventListener('submit', handleFormSubmit);



