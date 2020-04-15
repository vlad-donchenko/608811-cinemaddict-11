import {createElement} from "../utils";

const creteFilterMarkup = (menuItem, activeMenuItem) => {
  const {title, count} = menuItem;
  const activeFilterClass = menuItem === activeMenuItem ? `main-navigation__item--active` : ``;
  const linkHref = title.split(` `).join(``).toLowerCase();

  return (
    `<a href="#${linkHref}" class="main-navigation__item ${activeFilterClass}">${title} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createMenuTemplate = (menu) => {
  const menuMarkup = menu.map((menuItem) => {
    return creteFilterMarkup(menuItem, menu[0]);
  }).join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
           ${menuMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class Menu {
  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._menu);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Menu;
