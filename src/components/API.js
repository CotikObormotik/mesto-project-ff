export { getProfileInfo, getInitialCards, editProfileInfo, addCard, likeCard, dislikeCard, deleteCard, updateAvatar }

//Api и токен

const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-13",
    headers: {
      authorization: "2cdefba1-127c-4406-9a01-12572193dd6a",
      "Content-Type": "application/json",
    },
  };

  //проверка получения данных

  function checkResponse(res) {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получение данных профиля

  function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then((res) => checkResponse(res));
  }

 // Получение всех карточек с сервера

 function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then((res) => checkResponse(res));
  }

  //Отправка отредактированных данных профиля

  function editProfileInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => checkResponse(res));
  }

  //Добавление новой карточки

  function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => checkResponse(res));
  }

  //лайк карточки 

  function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    }).then((res) => checkResponse(res));
  }

  //Дизлайк текущей карточки

  function dislikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then((res) => checkResponse(res));
  }

  //Удаление текущей карточки

  function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then((res) => checkResponse(res));
  }

  //Отправка обновленого аватара

  function updateAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => checkResponse(res));
  }