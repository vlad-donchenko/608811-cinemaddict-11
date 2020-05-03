import {MOVIE_COUNT} from "./const";
import UserRankComponent from "./components/user-rank";
import FooterStatisticsComponent from "./components/footer-statistics";
import PageController from "./controllers/page";
import FilterController from "./controllers/filter";
import MoviesModel from "./models/movies";
import {getMovies} from "./mock/movie";
import {RenderPosition, render} from "./utils/render";

const movies = getMovies(MOVIE_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const headerElement = document.querySelector(`.header`);
const userRank = movies.length !== 0 ? movies[0].userDetails.personalRating : 0;
render(headerElement, new UserRankComponent(userRank), RenderPosition.BEFORE_END);

const mainElement = document.querySelector(`.main`);

const filterController = new FilterController(mainElement, moviesModel);
filterController.render();

const pageController = new PageController(mainElement, moviesModel);
pageController.render();

const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStatisticsComponent(movies.length), RenderPosition.BEFORE_END);
