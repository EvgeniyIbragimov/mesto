import { openPopup, closePopup } from '../utils/utils.js';
import Card from './Card.js';
import { FormValidator } from './validate.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';


const popup = document.querySelectorAll('.popup');
const editProfileButton = document.querySelector('.profile__edit-button'); // выбрал кнопку Редактировать
const popupProfileForm = document.querySelector('.popup_profile-form-js'); // присвоил весь контейнер
const closeEditFormButton = popupProfileForm.querySelector('.popup__close_profile-js'); // присвоил кнопке Закрыть
const nameInput = popupProfileForm.querySelector('.popup__input_name-js'); // строка "Имя" в Инпуте Попап.
const jobInput = popupProfileForm.querySelector('.popup__input_career-js'); // строка "О себе" в Инпуте Попап.
const profileName = document.querySelector('.profile__name'); // строка "Имя" в HTML
const profileCareer = document.querySelector('.profile__career'); // строка "О себе" в HTML
const submitForm = popupProfileForm.querySelector('.popup__container');
const cardAddButton = document.querySelector('.profile__add-button');
const popupCardForm = document.querySelector('.popup_card-form-js');
const placeName = document.querySelector('.popup__input_place-name-js'); // строка "Название" в Инпуте Попап.
const placeLink = document.querySelector('.popup__input_place-link-js'); // строка "Ссылка на картинку" в Инпуте Попап.
const cardCloseButton = popupCardForm.querySelector('.popup__close_card-js'); // кнопка закрытия попапа добавления карточки.
const popupCardPreview = document.querySelector('.popup_image-preview-js'); // открытие превью карточки
const previewCloseButton = document.querySelector('.popup__close_image-js');

const popupImage = popupCardPreview.querySelector('.popup__image');
const popupImageTitle = popupCardPreview.querySelector('.popup__image-title')

const initialCards = [
  {
    name: 'Коми',
    link: 'http://www.nepsite.ru/upload/resize_cache/iblock/e95/800_600_1/e95bb43266655f74646074d22501e5c3.jpg'
  },
  {
    name: 'Санкт Петербург',
    link: 'https://images.pexels.com/photos/6822960/pexels-photo-6822960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    name: 'Казань',
    link: 'https://images.pexels.com/photos/7015701/pexels-photo-7015701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    name: 'Крым',
    link: 'https://images.pexels.com/photos/8707524/pexels-photo-8707524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    name: 'Карелия',
    link: 'https://images.pexels.com/photos/8581427/pexels-photo-8581427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    name: 'Владивосток',
    link: 'https://images.pexels.com/photos/10996000/pexels-photo-10996000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  }
];

const element = document.querySelector('#element'); //Темплейт
const elementTemplate = element.content; //всё что внутри темплейта
const elementContainer = document.querySelector('.elements'); //контейнер под карточку
const elementCard = elementTemplate.querySelector('.elements__item');
const cardContainer = document.querySelector('.popup__card-container');

const config = {
  formSelector: '.popup__container', // форма полностью <form>
  inputSelector: '.popup__input',  // любой из четырёх инпутов <input>
  submitButtonSelector: '.popup__save-button',  // кнопка Сохранить - Создать
  inputErrorClass: 'popup__input_type_error',  // закрашивает поле красной рамкой
  errorClass: 'popup__input-error_is-active',  // меняет CSS св-во display
};

const elementCardClone = elementCard.cloneNode(true);  //клонирование блока с карточкой
const cardImage = elementCardClone.querySelector('.elements__image'); //присвоил клону картинки
const cardName = elementCardClone.querySelector('.elements__title'); //присвоил клону строки с именем
const cardDeleteButton = elementCardClone.querySelector('.elements__trash-button'); //присвоил клону корзины
const cardLikeButton = elementCardClone.querySelector('.elements__like-button'); //присвоил клону лайка

const profileValue = new FormValidator(config, document.querySelector('[name="profileValues"]'));
const cardValue = new FormValidator(config, document.querySelector('[name="cardValues"]'));
profileValue.enableValidation();
cardValue.enableValidation();

initialCards.forEach((item) => {
  // Создаст экземпляр карточки
  const card = new Card(item.name, item.link, '.element');

  // Создаст карточку и возвращает наружу
  const cardElement = card.generateCard();

  // Добавляет в DOM
  elementContainer.prepend(cardElement);
});

function clearForm() {  // функция очистки input popup при закрытии
  placeName.value = '';
  placeLink.value = '';
}

// listener'ы открытия popup
editProfileButton.addEventListener('click', () => {
  openPopup(popupProfileForm),
  profileValueToForm(),
  profileValue.toggleButtonState()
});

cardAddButton.addEventListener('click', () => {
  openPopup(popupCardForm),
  clearForm(),
  cardValue.toggleButtonState()
});

// listener'ы закрытия popup
closeEditFormButton.addEventListener('click', () => closePopup(popupProfileForm));
cardCloseButton.addEventListener('click', () => closePopup(popupCardForm));
previewCloseButton.addEventListener('click', () => closePopup(popupCardPreview));
submitForm.addEventListener('submit', submitFormHandler);

cardContainer.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const cardElement = new Card(placeName.value, placeLink.value, '.element').generateCard();

  // Добавляем в DOM
  elementContainer.prepend(cardElement);
  closePopup(popupCardForm);
})

// функция, которая позволяет забирать значения из HTML в Form.
function profileValueToForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileCareer.textContent;
}

function submitFormHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCareer.textContent = jobInput.value;
  closePopup(popupProfileForm);
}

// закрытие popup кликом на оверлей
popup.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
    });
});

const initialCardsList = new Section({ item: initialCards, renderer: (item) => itemsRenderer(item) }, 'elements');
console.log(initialCardsList);

function itemsRenderer(item) {
  const card = new Card(item.name, item.link, '.element');

  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  elementContainer.prepend(cardElement);
} 


export { element, cardImage, cardName, cardDeleteButton, cardLikeButton, initialCards, elementContainer, popupCardPreview, elementCardClone, config, cardContainer, profileValue, cardValue, popupImage, popupImageTitle };