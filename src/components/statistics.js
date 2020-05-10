import AbstractSmartComponent from "./abstract-smart-component";
import {
  getTodayMovies,
  getWeekMovies,
  getMonthMovies,
  getYearsMovies,
  getTopGenre,
  getUniqueGenresInfo
} from "../utils/statistics";
import {formatFilmDuration, getUserRankTitle} from "../utils/common";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const StatsType = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  Month: `month`,
  YEAR: `year`
};

const getMoviesDuration = (runtimeItems) => {
  return runtimeItems.reduce((accumulator, runtimeItem) => accumulator + runtimeItem);
};

const renderChart = (statisticCtx, movies) => {
  const uniqueGenresInfo = getUniqueGenresInfo(movies);

  const labelsItems = uniqueGenresInfo.slice().map((uniqueGenre) => {
    return uniqueGenre.name;
  });

  const dataItems = uniqueGenresInfo.slice().map((uniqueGenre) => {
    return uniqueGenre.counter;
  });

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: labelsItems,
      datasets: [{
        data: dataItems,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffba47`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsTemplate = (movies, userRank, topGenre, runtimeItems) => {
  const watchedMoviesCount = movies.length;

  const totalRuntime = runtimeItems ? getMoviesDuration(runtimeItems) : 0;
  let totalRuntimeHours = 0;
  let totalRuntimeMinutes = 0;

  if (totalRuntime !== 0) {
    const totalRuntimeFormat = formatFilmDuration(totalRuntime);
    totalRuntimeHours = totalRuntimeFormat.slice(0, totalRuntimeFormat.indexOf(`h`, 0));
    totalRuntimeMinutes = totalRuntimeFormat.slice(totalRuntimeFormat.indexOf(` `, 0), totalRuntimeFormat.indexOf(`m`, 0)).trim();
  }


  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked="">
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text"> ${watchedMoviesCount} <span class="statistic__item-description">${watchedMoviesCount > 1 ? `movies` : `movie`}</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalRuntimeHours} <span class="statistic__item-description">h</span> ${totalRuntimeMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};

class Statistics extends AbstractSmartComponent {
  constructor(movies, userRank, topGenre, runtimeItems) {
    super();
    this._movies = movies;
    this._userRank = userRank;
    this._topGenre = topGenre;
    this._runtimeItems = runtimeItems;
    this._statsType = StatsType.ALL_TIME;
    this._chart = null;
    this._renderCharts(this._statsType);
    this._setFilterChangeHandler();
  }

  getTemplate() {
    return createStatisticsTemplate(this._movies.getWatchedMovies(), this._userRank, this._topGenre, this._runtimeItems);
  }

  recoveryListeners() {
    this._setFilterChangeHandler();
  }

  show() {
    super.show();

    this.rerender();
  }

  rerender() {
    this._runtimeItems = this._movies.getWatchedMovies().length > 0 ? this._movies.getWatchedMovies().map((movie) => movie.runtime) : null;
    this._userRank = getUserRankTitle(this._movies.getWatchedMovies());
    this._topGenre = this._movies.getWatchedMovies().length > 0 ? getTopGenre(this._movies.getWatchedMovies()) : `-`;
    super.rerender();
    this._statsType = StatsType.ALL_TIME;
    this._renderCharts(this._statsType);
  }

  _resetCharts() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }

  _renderCharts(statsType) {
    const element = this.getElement();
    const statisticCtx = element.querySelector(`.statistic__chart`);
    this._resetCharts();
    this._chart = renderChart(statisticCtx, this._getMoviesByStatsType(statsType));
  }

  _setFilterChangeHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      evt.target.checked = true;
      this._statsType = evt.target.value;
      this._renderCharts(this._statsType);
    });
  }

  _getMoviesByStatsType(statsType) {
    let movies = [];

    switch (statsType) {
      case StatsType.ALL_TIME:
        movies = this._movies.getWatchedMovies();
        break;
      case StatsType.TODAY:
        movies = getTodayMovies(this._movies.getWatchedMovies());
        break;
      case StatsType.WEEK:
        movies = getWeekMovies(this._movies.getWatchedMovies());
        break;
      case StatsType.Month:
        movies = getMonthMovies(this._movies.getWatchedMovies());
        break;
      case StatsType.YEAR:
        movies = getYearsMovies(this._movies.getWatchedMovies());
        break;
    }

    return movies;
  }
}

export default Statistics;
