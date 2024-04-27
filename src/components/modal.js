export {openPopup, closePopup, openImage, handleFormSubmitProfile as handleFormSubmit};
import {popupTypeImage, popupImg, popupCapt, nameInput, jobInput, profileTitle, 
    profileDescription} from "../scripts/index"


//const cardTemplate = document.querySelector("#card-template").content;

//открытие попапов
function openPopup (somePopup) {
    somePopup.classList.add('popup_is-opened');
  }

// закрытие попапов

  function closePopup (somePopup) {
    somePopup.classList.remove('popup_is-opened');
  }

// открытие попап картинок

function openImage (imgSrc, captText) {
    popupImg.src = imgSrc;
    popupImg.alt = captText;
    popupCapt.textContent = captText;
    openPopup(popupTypeImage);
  }

//редактирование профиля

function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jopValue = jobInput.value;
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jopValue;
  }



