class FormValidator {
    constructor(config, formElement){
      this._form = formElement;
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;  // любой из четырёх инпутов
      this._submitButtonSelector = config.submitButtonSelector;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    }
  
  _checkInputValidity = (inputElement) => { // проверить валидность input
    if (inputElement.validity.valid) {
     this._hideInputError(inputElement); // если валидный, то прячем ошибку
  } else {
    this._showInputError(inputElement);
    }
  };
  
  _setEventListeners = () => {
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    
  const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));  // найти все input внутри форм
  const buttonElement = this._form.querySelector(this._submitButtonSelector); // найти кнопку Submit
  
  inputList.forEach((inputElement) => { // найти все элементы формы
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);  // проверить валидность input
        this.toggleButtonState(buttonElement, inputList, inputElement);
      });
  });
    this.toggleButtonState(buttonElement, inputList);  // установить значение для кнопки
  };
  
  _hasInvalidInput = () => {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
      };
  
  toggleButtonState = (inputElement) => {
    if (this._hasInvalidInput(this._inputList, inputElement)) { // если форма валидная то кнопка активна. Не валидная - не активна
      this._buttonElement.disabled = true; // делаю кнопку не активной
  } else if (!this._hasInvalidInput(this._inputList, inputElement)) {
      this._buttonElement.disabled = false; // делаю кнопку активной
    }
  };
  
  _showInputError = (inputElement) => {  // показываем ошибку
    const name = inputElement.getAttribute('name');
    const errorElement = this._form.querySelector(`#${name}-error`); // выбираю span под input'ом
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError = (inputElement) => {  // убираю сообщение об ошибке
  const name = inputElement.getAttribute('name');
  const errorElement = this._form.querySelector(`#${name}-error`); //  выбираю span под input'ом
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
  };
  
  enableValidation = () => {
    this._setEventListeners(this._form);
    }
  }
  
  export { FormValidator };