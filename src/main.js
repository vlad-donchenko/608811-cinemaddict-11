import {MOVIE_COUNT, MenuItem} from "./const";
import UserRankComponent from "./components/user-rank";
import StatisticsComponent from "./components/statistics";
import FooterStatisticsComponent from "./components/footer-statistics";
import PageController from "./controllers/page";
import MenuComponent from "./components/menu";
import FilterController from "./controllers/filter";
import MoviesModel from "./models/movies";
import {getMovies} from "./mock/movie";
import {RenderPosition, render} from "./utils/render";
import {getUserRankTitle} from "./utils/common";
import {getTopGenre} from "./utils/statistics";

const movies = getMovies(MOVIE_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const headerElement = document.querySelector(`.header`);
const userRank = getUserRankTitle(moviesModel.getWatchedMovies());
render(headerElement, new UserRankComponent(userRank), RenderPosition.BEFORE_END);

const mainElement = document.querySelector(`.main`);

const menuComponent = new MenuComponent();
render(mainElement, menuComponent, RenderPosition.BEFORE_END);

const filterContainerElement = menuComponent.getElement();

const filterController = new FilterController(filterContainerElement, moviesModel);
filterController.render();

const pageController = new PageController(mainElement, moviesModel);
pageController.render();

const topGenre = moviesModel.getWatchedMovies().length > 0 ? getTopGenre(moviesModel.getWatchedMovies()) : `-`;
const runtimeItems = moviesModel.getWatchedMovies().length > 0 ? moviesModel.getWatchedMovies().map((movie) => movie.runtime) : null;
const statisticsComponent = new StatisticsComponent(moviesModel, userRank, topGenre, runtimeItems);
render(mainElement, statisticsComponent, RenderPosition.BEFORE_END);
statisticsComponent.hide();

const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStatisticsComponent(movies.length), RenderPosition.BEFORE_END);

menuComponent.setMenuChangeHandler((menuItem) => {
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
