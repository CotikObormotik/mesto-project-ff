export { creatCard, cardTemplate, deleteCard, like, openImage, };
import { popupTypeImage, popupImg, popupCapt } from "../scripts/index";
import {openPopup} from "./modal";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

function creatCard(cardData, deleteCard, openImage, like) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTite = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = cardData.link;
    cardTite.textContent = cardData.name;
  
    likeButton.addEventListener('click', () => {
      like(likeButton);
    });
  
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement);
    });
  
    cardImage.addEventListener("click", () => {
      openImage(cardData.link, cardData.name);
    });
    
    return cardElement;
  }

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
    cardElement.remove();
  }

//Лайк

  function like(btn) {
    btn.classList.toggle('card__like-button_is-active');
  }

// открытие попап картинок

  function openImage (imgSrc, captText) {
    popupImg.src = imgSrc;
    popupImg.alt = captText;
    popupCapt.textContent = captText;
    openPopup(popupTypeImage);
  }