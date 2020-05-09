import {FilterType} from "../const";
import AbstractComponent from "./abstract-component";

const creteFilterMarkup = (menuItem, activeMenuItem) => {
  const {title, count} = menuItem;

  const activeFilterClass = activeMenuItem ? `main-navigation__item--active` : ``;
  const linkHref = title.split(` `).join(``).toLowerCase();

  const navigationCountMarkup = count ? `<span class="main-navigation__item-count">${count}</span>` : ``;

  return (
    `<a href="#${linkHref}" class="main-navigation__item ${activeFilterClass}" data-filter="${title}" id="${title}">
        ${title}
        ${navigationCountMarkup}
    </a>`
  );
};

const createMenuTemplate = (menu) => {
  const menuMarkup = menu.map((menuItem) => {
    return creteFilterMarkup(menuItem, menuItem.isActive);
  }).join(`\n`);

  return (
    `<div class="main-navigation__items">
       ${menuMarkup}
    </div>`
  );
};

class Filter extends AbstractComponent {
  constructor(menu) {
    super();
    this._menu = menu;
    this._activeFilterType = FilterType.ALL_MOVIES;
  }

  getTemplate() {
    return createMenuTemplate(this._menu);
  }

  _setActiveItem(filterItemNew, filterItemOld) {
    const itemNew = this.getElement().querySelector(`.main-navigation__item[data-filter="${filterItemNew}"]`);
    const itemOld = this.getElement().querySelector(`.main-navigation__item[data-filter="${filterItemOld}"]`);

    itemNew.classList.add(`main-navigation__item--active`);
    itemOld.classList.remove(`main-navigation__item--active`);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;

      if (target.tagName !== `A`) {
        return;
      }

      const filterName = target.dataset.filter;

      if (this._activeFilterType === filterName) {
        return;
      }

      this._setActiveItem(filterName, this._activeFilterType);

      this._activeFilterType = filterName;
      handler(this._activeFilterType);
    });
  }

}

export default Filter;
