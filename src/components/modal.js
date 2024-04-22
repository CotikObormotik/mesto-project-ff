export {openPopup, closePopup, setCloseEvent, openImage, handleFormSubmit, createNewCard};
import {popupTypeImage, popupImg, popupCapt, nameInput, jobInput, profileTitle, 
    profileDescription, inputCardName, inputURL, placesList, formElementNewPlase} from "../scripts/index"
import { like } from "./card";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

//открытие попапов
function openPopup (somePopup) {
    somePopup.classList.add('popup_is-opened');
  }

// закрытие попапов

  function closePopup (somePopup) {
    somePopup.classList.remove('popup_is-opened');
  }

//условия для закрытия

  function setCloseEvent (popups) {
    popups.forEach((popup) => {
    const pop = popup.querySelector('.popup__close');
    pop.addEventListener('click', () => {closePopup(popup)});
    document.addEventListener('keydown', (evt) => {
      if(evt.key === 'Escape') {
        closePopup(popup);
      }
    });
    document.addEventListener('click', (evt) => {
      if(evt.target === popup) {
        closePopup(popup);
      }
    })
    });
  }

// открытие попап картинок

function openImage (imgSrc, captText) {
    popupImg.src = imgSrc;
    popupImg.alt = captText;
    popupCapt.textContent = captText;
    openPopup(popupTypeImage);
  }

//редактирование профиля

function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jopValue = jobInput.value;
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jopValue;
  }

//добавление новой карточки  

function createNewCard (evt) {
    evt.preventDefault();
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTite = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector('.card__like-button');
  
    cardImage.src = inputURL.value;
    cardTite.textContent = inputCardName.value;
  
    
    likeButton.addEventListener('click', () => {
     like(likeButton);
    });
  
    deleteButton.addEventListener("click", () => {
     cardElement.remove();
    });
  
    cardImage.addEventListener("click", () => {
      openImage(cardImage.src, cardTite.textContent);
    });
  
    placesList.prepend(cardElement);
    formElementNewPlase.reset();
  };