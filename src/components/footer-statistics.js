import AbstractComponent from "./AbstractComponent";

const createFooterStatisticsTemplate = (moviesCount) => {
  const statisticsTitle = moviesCount !== 0 ? `${moviesCount} movies inside` : `0 movies inside`;

  return (
    `<section class="footer__statistics">
        <p>${statisticsTitle}</p>
    </section>`
  );
};

class FooterStatistics extends AbstractComponent {
  constructor(moviesCount) {
    super();
    this._moviesCount = moviesCount;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._moviesCount);
  }
}

export default FooterStatistics;
