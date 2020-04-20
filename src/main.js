import {MOVIE_COUNT} from "./const";
import MenuComponent from "./components/menu";
import MovieMainComponent from "./components/movie-main";
import SortComponent from "./components/sorting";
import UserRankComponent from "./components/user-rank";
import FooterStatisticsComponent from "./components/footer-statistics";
import PageController from "./controllers/PageController";
import {getMovies} from "./mock/movie";
import {getMenu} from "./mock/filter";
import {RenderPosition, render} from "./utils/render";

const movies = getMovies(MOVIE_COUNT);
const menu = getMenu();

const headerElement = document.querySelector(`.header`);
const userRank = movies.length !== 0 ? movies[0].userDetails.personalRating : 0;
render(headerElement, new UserRankComponent(userRank), RenderPosition.BEFORE_END);

const mainElement = document.querySelector(`.main`);
render(mainElement, new MenuComponent(menu), RenderPosition.BEFORE_END);

render(mainElement, new SortComponent(), RenderPosition.BEFORE_END);

const movieMainComponent = new MovieMainComponent();
render(mainElement, movieMainComponent, RenderPosition.BEFORE_END);

const pageController = new PageController(movieMainComponent);
pageController.render(movies);

const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStatisticsComponent(movies.length), RenderPosition.BEFORE_END);
