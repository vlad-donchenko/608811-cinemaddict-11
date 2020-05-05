import {MOVIE_COUNT} from "./const";
import UserRankComponent from "./components/user-rank";
import StatisticsComponent from "./components/statistics";
import FooterStatisticsComponent from "./components/footer-statistics";
import PageController from "./controllers/page";
import {getMovies} from "./mock/movie";
import {RenderPosition, render} from "./utils/render";

const movies = getMovies(MOVIE_COUNT);

const headerElement = document.querySelector(`.header`);
const userRank = movies.length !== 0 ? movies[0].userDetails.personalRating : 0;
render(headerElement, new UserRankComponent(userRank), RenderPosition.BEFORE_END);

const mainElement = document.querySelector(`.main`);

const pageController = new PageController(mainElement);
pageController.render(movies);

const statisticsComponent = new StatisticsComponent();
render(mainElement, statisticsComponent, RenderPosition.BEFORE_END);

const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStatisticsComponent(movies.length), RenderPosition.BEFORE_END);
