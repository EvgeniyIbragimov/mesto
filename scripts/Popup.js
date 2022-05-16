// Создайте класс Popup, который отвечает за открытие и закрытие попапа.
// Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._escapeListener = this._escapeListener.bind(this);
    }

    open() {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._escapeListener);
    }

    close() {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._escapeListener);
    }

    // содержит логику закрытия попапа клавишей Esc
    _escapeListener(evt) {
        if (evt.key === 'Escape') {
            // const popupIsOpened = document.querySelector('.popup_is-opened');
            // this.close(popupIsOpened);

            this.close();
            }
    }

    // добавляет слушатель клика иконке закрытия попапа
    setEventListeners() {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
            this.close(popup);
          }
            });

        this._popup.querySelector('.popup__close').addEventListener('click', () => close());
        } 
    }