export { creatCard, deleteMyCard, changeLike };

import { likeCard, dislikeCard } from "../components/API";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

function creatCard(cardData, deleteCard, openImage, like, profileId) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const likeCounter = cardElement.querySelector(".card__like-counter");
    const isLiked = cardData.likes.some((likeItem) => likeItem._id === profileId);
    
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;
    likeCounter.textContent = cardData.likes.length;

    if (cardData.owner._id === profileId) deleteButton.style.display = "block";
    else deleteButton.style.display = "none";

    if (isLiked) likeButton.classList.add("card__like-button_is-active");
    else likeButton.classList.remove("card__like-button_is-active");
  
    likeButton.addEventListener('click', () => {
      like(cardElement, cardData);
    });
  
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement, cardData);
    });
  
    cardImage.addEventListener("click", () => {
      openImage(cardData.link, cardData.name);
    });
    
    return cardElement;
  }

// @todo: Функция удаления карточки

function deleteMyCard(cardElement) {
    cardElement.remove();
  }

//Лайк

  /*function like(btn) {
    btn.classList.toggle('card__like-button_is-active');
  }*/


  function changeLike(card, cardData) {
    const likeButton = card.querySelector(".card__like-button");
    const likeCounter = card.querySelector(".card__like-counter");
  
    if (likeButton.classList.contains("card__like-button_is-active")) {
      dislikeCard(cardData._id)
        .then((data) => {
          likeCounter.textContent = data.likes.length;
  
          likeButton.classList.remove("card__like-button_is-active");
        })
        .catch((error) =>
          console.error("Ошибка при добавлении карточки:", error)
        );
    } else {
      likeCard(cardData._id)
        .then((data) => {
          likeCounter.textContent = data.likes.length;
  
          likeButton.classList.add("card__like-button_is-active");
        })
        .catch((error) =>
          console.error("Ошибка при добавлении карточки:", error)
        );
    }
  }

