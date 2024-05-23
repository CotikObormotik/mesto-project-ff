export { enableValidation, clearValidation };

//показать ошибку

function showInputError(input, errorMessage, validationConfig) {
  const errorElement = input
    .closest(validationConfig.formSelector)
    .querySelector(`.${validationConfig.inputErrorClass}-${input.name}`);

  input.classList.add(validationConfig.inputErrorClass);

  errorElement.textContent = errorMessage;

  errorElement.classList.add(validationConfig.errorClass);
}

//скрыть ошибку

function hideInputError(input, validationConfig) {
  const errorElement = input
    .closest(validationConfig.formSelector)
    .querySelector(`.${validationConfig.inputErrorClass}-${input.name}`);

  input.classList.remove(validationConfig.inputErrorClass);

  errorElement.textContent = "";

  errorElement.classList.remove(validationConfig.errorClass);
}

//функция проверки

function isValid(input, validationConfig) {
  if (input.validity.valueMissing) {
    showInputError(input, "Вы пропустили это поле.", validationConfig);

    return false;
  }

  if (input.validity.patternMismatch)
    input.setCustomValidity(input.dataset.error);
  else input.setCustomValidity("");

  if (input.validity.valid) hideInputError(input, validationConfig);
  else showInputError(input, input.validationMessage, validationConfig);

  return true;
}

// перебор всех инпутов

function setEventListeners(form, validationConfig) {
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  form.addEventListener("input", (evt) => {
    const input = evt.target;
    const isFormValid = form.checkValidity();

    isValid(input, validationConfig);
    toggleButtonState(isFormValid, submitButton, validationConfig);
  });

  form.addEventListener("reset", () => clearValidation(form, validationConfig));
}

//перебор всех форм

function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);

  forms.forEach((form) => setEventListeners(form, validationConfig));
}

//проверка валидности инпутов

/*function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}*/

// проверка кнопки

function toggleButtonState(valid, buttonElement, validationConfig) {
  if (valid) {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  }
}

// Сбросить валидацию

function clearValidation(form, validationConfig) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((input) => hideInputError(input, validationConfig));

  toggleButtonState(false, submitButton, validationConfig);
}

//

function kefkek(form, inputName, inputJob) {}
