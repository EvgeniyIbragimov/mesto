import { openCardPreview } from '../utils/utils.js';
import { popupCardPreview, popupImage, popupImageTitle } from './index.js';

class Card {
    constructor(title, image, cardSelector) {
      this._title = title;
      this._image = image;
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {  // забираю темплейт
      const placeCard = document
      .querySelector(this._cardSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);
  
      return placeCard;
    }
    

    _takeCardValues = () => {
      popupImage.src = this._image; // беру значение src
      popupImage.alt = `${'На фото ' + this._title}`;
      popupImageTitle.textContent = this._title; //беру значение имени картинки
    }

    _setEventListeners() {  // устанавливаю слушателей событий
      this._element.querySelector('.elements__like-button').addEventListener('click', () => {
        this._likeHandler();
      });
  
      this._element.querySelector('.elements__trash-button').addEventListener('click', () => {
        this._deleteHandler();
      });
  
      this._element.querySelector('.elements__image').addEventListener('click', () => {
        this._takeCardValues();
        openCardPreview(popupCardPreview);
      });
    }
 
    _likeHandler() {
      this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_is-active');
    }
  
    _deleteHandler() {
      this._element.remove();
    }
    
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.elements__image').src = this._image;
      this._element.querySelector('.elements__title').textContent = this._title;
      this._element.querySelector('.elements__image').alt = `${'На фото '} ${this._title}`;
  
      return this._element;
    }
}

export default Card;