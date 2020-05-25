import {MenuItem} from "./const";
import Api from "./api/api";
import MovieListPreloaderComponent from "./components/movie-list-preloader";
import SortComponent from "./components/sorting";
import UserRankComponent from "./components/user-rank";
import StatisticsComponent from "./components/statistics";
import FooterStatisticsComponent from "./components/footer-statistics";
import PageController from "./controllers/page";
import FilterController from "./controllers/filter";
import MoviesModel from "./models/movies";
import {RenderPosition, render, remove} from "./utils/render";
import {getUserRankTitle} from "./utils/common";
import {getTopGenre} from "./utils/statistics";

const AUTHORIZATION = `Basic er883jdIbzQ`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();

const headerElement = document.querySelector(`.header`);
let userRank = getUserRankTitle(moviesModel.getWatchedMovies());
const userRankComponent = new UserRankComponent(userRank);
render(headerElement, userRankComponent, RenderPosition.BEFORE_END);

const mainElement = document.querySelector(`.main`);

const filterController = new FilterController(mainElement, moviesModel);
filterController.render();

const sortComponent = new SortComponent();
render(mainElement, sortComponent, RenderPosition.BEFORE_END);

const pageController = new PageController(mainElement, moviesModel, api, sortComponent);

const topGenre = moviesModel.getWatchedMovies().length > 0 ? getTopGenre(moviesModel.getWatchedMovies()) : `-`;
const runtimeItems = moviesModel.getWatchedMovies().length > 0 ? moviesModel.getWatchedMovies().map((movie) => movie.runtime) : null;
const statisticsComponent = new StatisticsComponent(moviesModel, userRank, topGenre, runtimeItems);
render(mainElement, statisticsComponent, RenderPosition.BEFORE_END);
statisticsComponent.hide();

const footerElement = document.querySelector(`.footer`);
const footerStatisticsComponent = new FooterStatisticsComponent(0);
render(footerElement, footerStatisticsComponent, RenderPosition.BEFORE_END);

const movieListPreloaderComponent = new MovieListPreloaderComponent();
render(mainElement, movieListPreloaderComponent, RenderPosition.BEFORE_END);


filterController.setScreen((menuItem) => {
  switch (menuItem) {
    case MenuItem.ALL_MOVIES:
    case MenuItem.FAVORITES:
    case MenuItem.HISTORY:
    case MenuItem.WATCHLIST:
      statisticsComponent.hide();
      pageController.show();
      break;
    case MenuItem.STATS:
      statisticsComponent.show();
      pageController.hide();
      break;
  }
});


api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    userRank = getUserRankTitle(moviesModel.getWatchedMovies());
    remove(userRankComponent);
    render(headerElement, new UserRankComponent(userRank), RenderPosition.BEFORE_END);
    remove(movieListPreloaderComponent);
    pageController.render();
    filterController.render();
    remove(footerStatisticsComponent);
    render(footerElement, new FooterStatisticsComponent(moviesModel.getMoviesAll().length), RenderPosition.BEFORE_END);
  });
