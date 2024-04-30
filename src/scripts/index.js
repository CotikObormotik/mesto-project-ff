import "../pages/index.css";
import { initialCards } from "./cards.js";
import { creatCard, deleteCard, like,  } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal";


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
 
  const cardData = {
    name: inputCardName.value,
    link: inputURL.value
  }
  
  placesList.prepend(creatCard(cardData, deleteCard, openImage, like));
  formElementNewPlase.reset();
};

//Функция редактирование профиля

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jopValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jopValue;
}

//функция открытие попап картинок

function openImage (imgSrc, captText) {
  popupImg.src = imgSrc;
  popupImg.alt = captText;
  popupCapt.textContent = captText;
  openPopup(popupTypeImage);
}
