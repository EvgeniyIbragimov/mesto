import { Popup } from './Popup.js';
// import { popupImage } from '../src/index.js'


// класс должен перезаписывать родительский метод open. 
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.


export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)

    }

    open() {
        super.open()
        
        popupImage.src = this._image; //беру значение src
        popupImage.alt = `${'На фото '}${this._title}`;
        popupImageTitle.textContent = this._title; //беру значение имени картинки
    }
}