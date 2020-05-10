import {MOVIE_COUNT} from "./const";
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

const movies = getMovies(MOVIE_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const headerElement = document.querySelector(`.header`);
const userRank = getUserRankTitle(movies.length !== 0 ? movies[0].userDetails.personalRating : 0);
render(headerElement, new UserRankComponent(userRank), RenderPosition.BEFORE_END);

const mainElement = document.querySelector(`.main`);

const menuComponent = new MenuComponent();
render(mainElement, menuComponent, RenderPosition.BEFORE_END);

const filterContainerElement = menuComponent.getElement();

const filterController = new FilterController(filterContainerElement, moviesModel);
filterController.render();

const pageController = new PageController(mainElement, moviesModel);
pageController.render();

const statisticsComponent = new StatisticsComponent(moviesModel, userRank);
render(mainElement, statisticsComponent, RenderPosition.BEFORE_END);

const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStatisticsComponent(movies.length), RenderPosition.BEFORE_END);

menuComponent.setMenuChangeHandler((id) => {
  console.log(id);
});
