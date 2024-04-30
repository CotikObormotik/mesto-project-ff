export {openPopup, closePopup, closePopupByEsc, closeByOverlay};

// закрытие попапа по кнопке

function closePopupByEsc (evt) {
  if(evt.key === 'Escape') {
    const moduls = Array.from(document.querySelectorAll('.popup'));
    const popupOpend = moduls.find((openItem) => {
      return openItem.classList.contains('popup_is-opened');
    })
    closePopup(popupOpend);
    document.removeEventListener('keydown', closePopupByEsc);
  }
}

//закрытие по Оверлею

function closeByOverlay (evt) {
  const moduls = Array.from(document.querySelectorAll('.popup'));
  const popupOpend = moduls.find((openItem) => {
    return openItem.classList.contains('popup_is-opened');
  })
    if(evt.target === popupOpend) {
      closePopup(popupOpend);
    }
}

//открытие попапов
function openPopup (somePopup) {
    somePopup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
    document.addEventListener('click', closeByOverlay)
  }

// закрытие попапов

  function closePopup (somePopup) {
    somePopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
    document.removeEventListener('click', closeByOverlay)
  }





