import {createElement} from "../utils";

const createFooterStatisticsTemplate = (moviesCount) => {
  const statisticsTitle = moviesCount !== 0 ? `${moviesCount} movies inside` : `0 movies inside`;

  return (
    `<section class="footer__statistics">
        <p>${statisticsTitle}</p>
    </section>`
  );
};

class FooterStatistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate();
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

export default FooterStatistics;
