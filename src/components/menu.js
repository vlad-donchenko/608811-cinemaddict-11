import AbstractComponent from "./AbstractComponent";

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

class Menu extends AbstractComponent {
  constructor(menu) {
    super();
    this._menu = menu;
  }

  getTemplate() {
    return createMenuTemplate(this._menu);
  }
}

export default Menu;
