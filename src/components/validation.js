export {showInputError, hideInputError, isValid, enableValidation};

//показать ошибку

function showInputError (form, input, errorMessage) {
    const formError = form.querySelector(`.${input.id}-error`);

    input.classList.add('popup__input_type_error');
    formError.textContent = errorMessage;
    formError.classList.add('popup__input-error_active');
}

//скрыть ошибку

function hideInputError (form, input) {
    const formError = form.querySelector(`.${input.id}-error`);

    input.classList.remove('popup__input_type_error');
    formError.textContent = '';
    formError.classList.remove('popup__input-error_active');
}

//функция проверки

function isValid (form, input) {
    if(input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    }
    else {
        input.setCustomValidity('');
    }

    if(!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
    }
    else {
        hideInputError(form, input);
    }
}

// перебор всех инпутов

function setEventListeners (form) {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const buttonElement = form.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(form, inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

//перебор всех форм

function enableValidation () {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    })
}

//проверка валидности инпутов

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// проверка кнопки 

function toggleButtonState (inputList, buttonElement) {
    if(hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button-inactive')
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button-inactive')
    }
}
