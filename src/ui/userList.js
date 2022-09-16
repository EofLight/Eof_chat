export default class UserList {
  constructor(element) {
    this.element = element;
    this.items = new Set();
  }

  buildDOM() {
    const fragment = document.createDocumentFragment();

    this.element.innerHTML = '';

    for (const name of this.items) {
      const main= document.createElement('div');
      const element = document.createElement('div');
      const photo = document.createElement('div');
      main.classList.add('ums');
      photo.classList.add('user__photo__message');
      photo.classList.add(`${name}`);
      photo.style.backgroundImage=`url(./photos/${
        name
      }.png?t=${Date.now()})`;
      element.classList.add('user__name');
      element.textContent = name;
      main.append(photo);
      main.append(element);
      fragment.append(main);
     
    }

    this.element.append(fragment);
  }

  add(name) {
    this.items.add(name);
    this.buildDOM();
  }

  remove(name) {
    this.items.delete(name);
    this.buildDOM();
  }
}
