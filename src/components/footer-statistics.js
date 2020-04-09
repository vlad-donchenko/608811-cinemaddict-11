const createFooterStatisticsTemplate = (moviesCount) => {
  const statisticsTitle = moviesCount !== 0 ? `${moviesCount} movies inside` : `0 movies inside`;

  return (
    `<section class="footer__statistics">
        <p>${statisticsTitle}</p>
    </section>`
  );
};

export {createFooterStatisticsTemplate};
