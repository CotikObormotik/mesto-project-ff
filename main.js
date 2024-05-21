(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-13",headers:{authorization:"2cdefba1-127c-4406-9a01-12572193dd6a","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=document.querySelector("#card-template").content;function r(e,t,r,o,c){var u=n.querySelector(".card").cloneNode(!0),a=u.querySelector(".card__delete-button"),i=u.querySelector(".card__image"),l=u.querySelector(".card__title"),s=u.querySelector(".card__like-button"),p=u.querySelector(".card__like-counter"),d=e.likes.some((function(e){return e._id===c}));return i.src=e.link,l.textContent=e.name,p.textContent=e.likes.length,e.owner._id===c?a.style.display="block":a.style.display="none",d?s.classList.add("card__like-button_is-active"):s.classList.remove("card__like-button_is-active"),s.addEventListener("click",(function(){o(u,e)})),a.addEventListener("click",(function(){t(u,e)})),i.addEventListener("click",(function(){r(e.link,e.name)})),u}function o(n,r){var o,c=n.querySelector(".card__like-button"),u=n.querySelector(".card__like-counter");c.classList.contains("card__like-button_is-active")?(o=r._id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){u.textContent=e.likes.length,c.classList.remove("card__like-button_is-active")})).catch((function(e){return console.error("Ошибка при добавлении карточки:",e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(r._id).then((function(e){u.textContent=e.likes.length,c.classList.add("card__like-button_is-active")})).catch((function(e){return console.error("Ошибка при добавлении карточки:",e)}))}function c(e){"Escape"===e.key&&(i(Array.from(document.querySelectorAll(".popup")).find((function(e){return e.classList.contains("popup_is-opened")}))),document.removeEventListener("keydown",c))}function u(e){var t=Array.from(document.querySelectorAll(".popup")).find((function(e){return e.classList.contains("popup_is-opened")}));e.target===t&&i(t)}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),document.addEventListener("click",u)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),document.removeEventListener("click",u)}function l(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove("popup__button-inactive")):(t.disabled=!0,t.classList.add("popup__button-inactive"))}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p=document.querySelector(".places__list"),d=document.querySelectorAll(".popup"),f=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_image"),y=_.querySelector(".popup__image"),m=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),h=document.querySelector(".popup_type_new-card"),S=_.querySelector(".popup__caption"),b=document.querySelector(".profile").querySelector(".profile__image"),q=document.querySelector(".popup_type_edit_avatar"),k=document.querySelector('.popup__form[name="avatar"]'),L=k.querySelector(".popup__input_type_url"),E=k.querySelector(".popup__button");k.addEventListener("submit",(function(n){n.preventDefault();var r,o=E.textContent;E.textContent="Сохранение...",(r=L.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){b.style.backgroundImage="url(\\".concat(e.avatar,")"),i(q)})).catch((function(e){return console.error("Ошибка при получении данных пользователя:",e)})).finally((function(){return E.textContent=o}))})),b.addEventListener("click",(function(){a(q)})),m.addEventListener("click",(function(){a(f)})),v.addEventListener("click",(function(){a(h)})),function(e){e.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){i(e)}))}))}(d);var C=document.querySelector(".profile__info"),g=C.querySelector(".profile__title"),x=C.querySelector(".profile__description"),A=f.querySelector('.popup__form[name="edit-profile"]'),w=A.querySelector(".popup__input_type_name"),U=A.querySelector(".popup__input_type_description"),j=A.querySelector(".popup__button");w.value=g.textContent,U.value=x.textContent,A.addEventListener("submit",(function(n){n.preventDefault();var r,o,c=j.textContent;j.textContent="Сохранение...",(r=w.value,o=U.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(e){g.textContent=e.name,x.textContent=e.about})).catch((function(e){return console.error("Ошибка получения данных пользователя:",e)})).finally((function(){return j.textContent=c}))})),j.addEventListener("click",(function(){i(f)}));var O=h.querySelector('.popup__form[name="new-place"]'),T=O.querySelector(".popup__button"),P=O.querySelector(".popup__input_type_card-name"),D=O.querySelector('.popup__input_type_url[type="url"]');function I(e,t){y.src=e,y.alt=t,S.textContent=t,a(_)}O.addEventListener("submit",(function(n){n.preventDefault();var c,u,a=T.textContent;T.textContent="Сохранение...",(c=P.value,u=D.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:c,link:u})}).then((function(e){return t(e)}))).then((function(e){var t=r(e,N,I,o,M);p.prepend(t),O.reset()})).catch((function(e){return console.error("Ошибка при добавлении карточки:",e)})).finally((function(){return T.textContent=a}))})),T.addEventListener("click",(function(){i(h)})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){var t,n,r;t=e,n=Array.from(t.querySelectorAll(".popup__input")),r=t.querySelector(".popup__button"),l(n,r),n.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.textContent="",n.classList.remove("popup__input-error_active")}(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),r.textContent=n,r.classList.add("popup__input-error_active")}(e,t,t.validationMessage)}(t,e),l(n,r)}))}))}));var M=null;function N(n,r){var o;(o=r._id,fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(){n.remove()})).catch((function(e){return console.error("Ошибка при добавлении карточки:",e)}))}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,c=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=c[0],a=c[1];M=u._id,b.style.backgroundImage="url(\\".concat(u.avatar,")"),g.textContent=u.name,x.textContent=u.about,a.forEach((function(e){p.append(r(e,N,I,o,M))}))})).catch((function(e){return console.error("Ошибка при получении данных пользователя:",e)}))})();