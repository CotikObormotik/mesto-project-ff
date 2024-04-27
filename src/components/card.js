export { creatCard, cardTemplate, deleteCard, like, createNewCard };
import {inputCardName, inputURL, placesList, formElementNewPlase} from "../scripts/index";
import {openImage} from "./modal";
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

//добавление новой карточки  

  function createNewCard (evt) {
    evt.preventDefault();
   
    const cardData = {
      name: inputCardName.value,
      link: inputURL.value
    }
    
    placesList.prepend(creatCard(cardData,deleteCard, openImage, like));
    formElementNewPlase.reset();
  };


