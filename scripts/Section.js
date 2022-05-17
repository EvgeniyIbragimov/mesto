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