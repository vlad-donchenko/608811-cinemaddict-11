import {FilterType} from "../const";
import AbstractComponent from "./abstract-component";

const creteFilterMarkup = (menuItem, activeMenuItem) => {
  const {title, count} = menuItem;

  const activeFilterClass = activeMenuItem ? `main-navigation__item--active` : ``;
  const linkHref = title.split(` `).join(``).toLowerCase();
  const navigationCountMarkup = count !== null ? `<span class="main-navigation__item-count">${count}</span>` : ``;

  return (
    `<a href="#${linkHref}" class="main-navigation__item ${activeFilterClass}" data-action="${title}">
        ${title}
        ${navigationCountMarkup}
    </a>`
  );
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((filterItem) => {
    return creteFilterMarkup(filterItem, filterItem.isActive);
  }).join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
           ${filterMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional" data-action="Stats">Stats</a>
    </nav>`
  );
};

class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._activeFilterType = FilterType.ALL_MOVIES;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  _setActiveItem(active) {
    const items = this.getElement().querySelectorAll(`a`);
    const itemActive = this.getElement().querySelector(`a[data-action="${active}"]`);

    items.forEach((item) => {
      item.classList.remove(`main-navigation__item--active`);
    });

    itemActive.classList.add(`main-navigation__item--active`);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;

      if (target.tagName !== `A`) {
        return;
      }

      const filterName = target.dataset.action;

      if (this._activeFilterType === filterName) {
        return;
      }

      this._setActiveItem(filterName);

      this._activeFilterType = filterName;
      handler(this._activeFilterType);
    });
  }

}

export default Filter;
