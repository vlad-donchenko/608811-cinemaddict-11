import {EXTRA_MOVIE_COUNT, MOVIE_COUNT} from "./const";
import {render} from "./utils";
import {createFilmExtraTemplate} from "./components/film-extra";
import {createMenuTemplate} from "./components/menu";
import {createMovieTemplate} from "./components/movie";
import {createMovieContainerTemplate} from "./components/movie-container";
import {createMovieListTemplate} from "./components/movie-list";
import {createMovieMainTemplate} from "./components/movie-main";
import {createFilmPopupTemplate} from "./components/popup";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {createSortTemplate} from "./components/sorting";
import {createUserRankTemplate} from "./components/user-rank";

const footerElement = document.querySelector(`.footer`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
render(headerElement, createUserRankTemplate(), `beforeend`);
render(mainElement, createMenuTemplate(), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);

render(mainElement, createMovieMainTemplate(), `beforeend`);
const movieElement = mainElement.querySelector(`.films`);

render(movieElement, createMovieListTemplate(), `beforeend`);

const movieListElement = mainElement.querySelector(`.films-list`);
render(movieListElement, createMovieContainerTemplate(), `beforeend`);

const movieListContainerElement = movieListElement.querySelector(`.films-list__container`);

for (let i = 0; i < MOVIE_COUNT; i++) {
  render(movieListContainerElement, createMovieTemplate(), `beforeend`);
}

render(movieListElement, createShowMoreButtonTemplate(), `beforeend`);

for (let i = 0; i < EXTRA_MOVIE_COUNT; i++) {
  render(movieElement, createFilmExtraTemplate(), `beforeend`);
}

const movieExtraContainerElements = Array.from(document.querySelectorAll(`.films-list--extra`));
const [movieTopRatingElement, movieMostCommentedElement] = movieExtraContainerElements;

render(movieTopRatingElement, createMovieContainerTemplate(), `beforeend`);
render(movieMostCommentedElement, createMovieContainerTemplate(), `beforeend`);

const movieTopRatingContainerElement = movieTopRatingElement.querySelector(`.films-list__container`);
const movieMostCommentedContainerElement = movieMostCommentedElement.querySelector(`.films-list__container`);

for (let i = 0; i < EXTRA_MOVIE_COUNT; i++) {
  render(movieTopRatingContainerElement, createMovieTemplate(), `beforeend`);
  render(movieMostCommentedContainerElement, createMovieTemplate(), `beforeend`);
}

render(footerElement, createFilmPopupTemplate(), `afterend`);
