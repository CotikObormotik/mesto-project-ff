// @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
    const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки

    function creatCArd (initialCards, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = initialCards.link;
    cardElement.querySelector('.card__title').textContent = initialCards.name;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

// @todo: Функция удаления карточки
    function deleteCard(cardElement) {
        cardElement.remove();
    }
    return cardElement;
};


// @todo: Вывести карточки на страницу
 initialCards.forEach((element) => {
    placesList.append(creatCArd(element));
 });