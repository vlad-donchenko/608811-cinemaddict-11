import AbstractComponent from "./AbstractComponent";

const SortType = {
  DEFAULT: `default`,
  SORT_DATE: `sort-date`,
  SORT_RATING: `sort-rating`
};

const createSortTemplate = (currentSortType) => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort="${SortType.DEFAULT}" class="sort__button ${currentSortType === SortType.DEFAULT ? `sort__button--active` : ``}">Sort by default</a></li>
      <li><a href="#" data-sort="${SortType.SORT_DATE}" class="sort__button ${currentSortType === SortType.SORT_DATE ? `sort__button--active` : ``}">Sort by date</a></li>
      <li><a href="#" data-sort="${SortType.SORT_RATING}" class="sort__button" ${currentSortType === SortType.SORT_RATING ? `sort__button--active` : ``}>Sort by rating</a></li>
    </ul>`
  );
};

class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;

      if (target.tagName !== `A`) {
        return;
      }

      const sortType = target.dataset.sort;

      if (sortType === this._currentSortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}

export {SortType};
export default Sort;
