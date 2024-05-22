import "../pages/index.css";
import { initialCards } from "./cards.js";
import { creatCard, deleteMyCard, changeLike } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal";
import { enableValidation, clearValidation } from "../components/validation";
import { getProfileInfo, getInitialCards, editProfileInfo, addCard, deleteCard, updateAvatar } from "../components/API";


// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
/*initialCards.forEach((element) => {
  placesList.append(creatCard(element, deleteCard, openImage, like));
});*/

//popap profile

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImg = popupTypeImage.querySelector('.popup__image');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonAddPrifile = document.querySelector('.profile__add-button');
const newCard = document.querySelector('.popup_type_new-card');
const popupCapt = popupTypeImage.querySelector('.popup__caption');
const profile = document.querySelector(".profile");
const profileAvatarEditButton = profile.querySelector(".profile__image");
const popupAvatar = document.querySelector('.popup_type_edit_avatar');
const formAvatar = document.querySelector('.popup__form[name="avatar"]');
const avatarLinkInput = formAvatar.querySelector('.popup__input_type_url');
const buttonAvatarForm = formAvatar.querySelector('.popup__button');


formAvatar.addEventListener('submit', handleAvatarFormSubmit);
profileAvatarEditButton.addEventListener('click', () => {openPopup(popupAvatar)});
buttonOpenPopupProfile.addEventListener('click', () => {openPopup(popupEdit)});
buttonAddPrifile.addEventListener('click', () => {openPopup(newCard)});


setCloseEvent(popups);

//редактирование профиля

const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

const formElementProfile = popupEdit.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const popupButtonProfile = formElementProfile.querySelector('.popup__button');

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

formElementProfile.addEventListener('submit', handleFormSubmitProfile);
popupButtonProfile.addEventListener('click', () => {
  closePopup(popupEdit)});

//добавление новой карточки

const formElementNewPlase = newCard.querySelector('.popup__form[name="new-place"]');
const popupButtonNewPlase = formElementNewPlase.querySelector('.popup__button');
const inputCardName = formElementNewPlase.querySelector('.popup__input_type_card-name');
const inputURL = formElementNewPlase.querySelector('.popup__input_type_url[type="url"]');

formElementNewPlase.addEventListener('submit', createNewCard);
popupButtonNewPlase.addEventListener('click', () => {closePopup(newCard)});

//условия для закрытия модалок

function setCloseEvent (popups) {
  popups.forEach((popup) => {
  const button = popup.querySelector('.popup__close');
  button.addEventListener('click', () => {closePopup(popup)});
  });
}

//добавление новой карточки  

function createNewCard (evt) {
  evt.preventDefault();

  const originalButtonText = popupButtonNewPlase.textContent;
  popupButtonNewPlase.textContent = "Сохранение...";

  addCard(inputCardName.value, inputURL.value)
    .then((cardData) => {
      const myNewCard = creatCard(
        cardData, removeCard, openImage, changeLike, profileId
      );
      placesList.prepend(myNewCard); 
      closePopup(newCard);
      formElementNewPlase.reset();
    })
    .catch((error) => console.error("Ошибка при добавлении карточки:", error))
    .finally(() => (popupButtonNewPlase.textContent = originalButtonText));
    clearValidation(formElementNewPlase, validationConfig);
  /*const cardData = {
    name: inputCardName.value,
    link: inputURL.value
  }*/
  
  //placesList.prepend(creatCard(cardData, deleteCard, openImage, like));
};

//Функция редактирование профиля

function handleFormSubmitProfile(evt) {
  evt.preventDefault();

  const originalButtonText = popupButtonProfile.textContent;
  popupButtonProfile.textContent = "Сохранение...";

  editProfileInfo(nameInput.value, jobInput.value)
  .then((profileData) => {
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;

    closePopup(popupEdit);
    formElementProfile.reset();
  })
  .catch((error) =>
  console.error("Ошибка получения данных пользователя:", error)
)
  .finally(() => (popupButtonProfile.textContent = originalButtonText));
  clearValidation(formElementProfile, validationConfig)
  
  /*const nameValue = nameInput.value;
  const jopValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jopValue;*/
}

//функция открытие попап картинок

function openImage (imgSrc, captText) {
  popupImg.src = imgSrc;
  popupImg.alt = captText;
  popupCapt.textContent = captText;
  openPopup(popupTypeImage);
}

//Валидация форм

//CSS-классы

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
}

enableValidation (validationConfig);

//api

let profileId = null;

//вывод карточек

Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    profileId = profileData._id;

    profileAvatarEditButton.style.backgroundImage = `url(\\${profileData.avatar})`;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;

    cardsData.forEach((cardData) => {
      placesList.append(creatCard(cardData, removeCard, openImage, changeLike, profileId)
      );
    });
  })
  .catch((error) =>
    console.error("Ошибка при получении данных пользователя:", error)
  );

  //Удалить свою карточку

  function removeCard(card, cardData) {
    deleteCard(cardData._id)
      .then(() => deleteMyCard(card))
      .catch((error) => console.error("Ошибка при добавлении карточки:", error));
  }
   
  //Изменить аватар профиля

  function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const originalButtonText = buttonAvatarForm.textContent;
    buttonAvatarForm.textContent = "Сохранение...";
  
    updateAvatar(avatarLinkInput.value)
      .then((profileData) => {
        profileAvatarEditButton.style.backgroundImage = `url(\\${profileData.avatar})`;
  
        closePopup(popupAvatar);
        formAvatar.reset();
      })
      .catch((error) =>
        console.error("Ошибка при получении данных пользователя:", error)
      )
      .finally(() => (buttonAvatarForm.textContent = originalButtonText));

      clearValidation(formAvatar, validationConfig)
  }

  clearValidation(formAvatar, validationConfig);
  clearValidation(formElementProfile, validationConfig);
  clearValidation(formElementNewPlase, validationConfig);
