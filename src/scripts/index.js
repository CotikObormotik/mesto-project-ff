import "../pages/index.css";
import { initialCards } from "./cards.js";
import { creatCard, deleteCard, like, createNewCard } from "../components/card.js";
import { openPopup, closePopup, openImage, handleFormSubmit } from "../components/modal";

export {popupTypeImage, popupImg, popupCapt, nameInput, jobInput, profileTitle, 
  profileDescription, inputCardName, inputURL, placesList, formElementNewPlase, popupButtonNewPlase};

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  placesList.append(creatCard(element, deleteCard, openImage, like));
});

//popap profile

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImg = popupTypeImage.querySelector('.popup__image');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonAddPrifile = document.querySelector('.profile__add-button');
const newCard = document.querySelector('.popup_type_new-card');
const popupCapt = popupTypeImage.querySelector('.popup__caption');


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

formElementProfile.addEventListener('submit', handleFormSubmit);
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
  const pop = popup.querySelector('.popup__close');
  const closePopupByEsc = (evt) => {
    if(evt.key === 'Escape') {
      closePopup(popup);
    }
  };
  pop.addEventListener('click', () => {closePopup(popup)});
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('click', (evt) => {
    if(evt.target === popup) {
      closePopup(popup);
    }
  })
  });
}





