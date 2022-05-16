// import { elementContainer, initialCards as items } from './index.js'

class Section {

    constructor({ item, renderer }, elementContainer) {
        this._item = item;
        this._renderer = renderer;
        this._elementContainer =  document.querySelector(`${'.' + elementContainer}`);
    }


    // addItem принимает параметр element и вставляет его в контейнер методом append. Теперь вся логика отрисовки элемента находится в методе addItem
    addItem(element) {
        this._elementContainer.prepend(element);
      }


    // renderItems — перебирает массив данных _items. Вызывает для каждого элемента массива метод addItem
    renderItems(item) {
        item.forEach(item => {
          this._renderer(item);
        });
      }
}

export { Section }

// renderer: () => {
//   const card = new HorizontalCard(item, '.horizontal-card');
//   const cardElement = card.generateCard();
//   this.setItem(cardElement);
// }

// renderer создает отдельную карточку, получает разметку этой карточки и потом получившийся результат передает Section для вставки
//  (тут я предполагаю что у Section еще есть метод типа addItem — для вставки единичной краточки)

// Если renderer объявлять динамически при инициализации Section то там же можно к новоиспеченному объекту Section и обращаться
// const cardList = new Section({
//   renderer: (items) => {
//     // создается карточка и получается ее разметка
//     // cardList.addSingleItem(передаем сюда разметку карточки)
//   }
// }, cardContainer);

// cardList.renderItems(initialCards);