import {MOVIE_COUNT, MOVIE_SHOW_START, SHOWING_MOVIE_COUNT_BY_BUTTON, ExtraMovieTitle} from "./const";
import {render, getTopRatingMovies, getMostCommentedFilms} from "./utils";
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
import {createFooterStatisticsTemplate} from "./components/footer-statistics";
import {createNoDataTemplate} from "./components/no-data";
import {getMovies} from "./mock/movie";
import {getMenu} from "./mock/filter";

const movies = getMovies(MOVIE_COUNT);
const menu = getMenu();
const moviesTopRated = getTopRatingMovies(movies.slice());
const moviesMostCommented = getMostCommentedFilms(movies.slice());

let showMovieStart = MOVIE_SHOW_START;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const userRank = movies.length !== 0 ? movies[0].userDetails.personalRating : 0;

render(headerElement, createUserRankTemplate(userRank), `beforeend`);
render(mainElement, createMenuTemplate(menu), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);

render(mainElement, createMovieMainTemplate(), `beforeend`);
const movieElement = mainElement.querySelector(`.films`);

if (movies.length !== 0) {
  render(movieElement, createMovieListTemplate(), `beforeend`);

  const movieListElement = mainElement.querySelector(`.films-list`);
  render(movieListElement, createMovieContainerTemplate(), `beforeend`);

  const movieListContainerElement = movieListElement.querySelector(`.films-list__container`);

  movies.slice(0, showMovieStart).forEach((movie) => {
    render(movieListContainerElement, createMovieTemplate(movie), `beforeend`);
  });

  render(movieListElement, createShowMoreButtonTemplate(), `beforeend`);

  if (moviesTopRated[0].rating !== 0) {
    render(movieElement, createFilmExtraTemplate(ExtraMovieTitle.TOP_RATED), `beforeend`);
    const extraListElement = document.querySelectorAll(`.films-list--extra`);
    render(extraListElement[0], createMovieContainerTemplate(), `beforeend`);
    const movieExtraContainer = extraListElement[0].querySelector(`.films-list__container`);

    moviesTopRated.forEach((movieTopRated) => {
      render(movieExtraContainer, createMovieTemplate(movieTopRated), `beforeend`);
    });
  }

  if (moviesMostCommented[0].comments.length !== 0) {
    render(movieElement, createFilmExtraTemplate(ExtraMovieTitle.MOST_COMMENTED), `beforeend`);
    const extraListElement = document.querySelectorAll(`.films-list--extra`);
    render(extraListElement[1], createMovieContainerTemplate(), `beforeend`);
    const movieExtraContainer = extraListElement[1].querySelector(`.films-list__container`);

    moviesMostCommented.forEach((movieMostCommented) => {
      render(movieExtraContainer, createMovieTemplate(movieMostCommented), `beforeend`);
    });
  }

  const showMoreButtonElement = document.querySelector(`.films-list__show-more`);

  showMoreButtonElement.addEventListener(`click`, () => {
    const prevMovieShowCount = showMovieStart;
    showMovieStart = showMovieStart + SHOWING_MOVIE_COUNT_BY_BUTTON;

    movies.slice(prevMovieShowCount, showMovieStart).forEach((movie) => {
      render(movieListContainerElement, createMovieTemplate(movie), `beforeend`);
    });

    if (showMovieStart >= movies.length) {
      showMoreButtonElement.remove();
    }
  });

  render(footerElement, createFilmPopupTemplate(movies[0]), `afterend`);

} else {
  render(movieElement, createNoDataTemplate(), `beforeend`);
}

render(footerElement, createFooterStatisticsTemplate(movies.length), `beforeend`);
