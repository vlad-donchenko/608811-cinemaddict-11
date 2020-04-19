import {MOVIE_COUNT, MOVIE_SHOW_START, SHOWING_MOVIE_COUNT_BY_BUTTON, ExtraMovieTitle} from "./const";
import {getTopRatingMovies, getMostCommentedFilms} from "./utils/common";
import FilmExtraComponent from "./components/film-extra";
import MenuComponent from "./components/menu";
import MovieComponent from "./components/movie";
import MovieContainerComponent from "./components/movie-container";
import MovieListComponent from "./components/movie-list";
import MovieMainComponent from "./components/movie-main";
import MoviePopupComponent from "./components/movie-popup";
import ShowMoreButtonComponent from "./components/show-more-button";
import SortComponent from "./components/sorting";
import UserRankComponent from "./components/user-rank";
import FooterStatisticsComponent from "./components/footer-statistics";
import NoDataComponent from "./components/no-data";
import {getMovies} from "./mock/movie";
import {getMenu} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";

const renderMovie = (movieListElement, movie) => {
  const bodyElement = document.querySelector(`body`);

  const closePopup = () => {
    document.removeEventListener(`keydown`, onClosePopupCloseKeyPress);
    filmPopupComponent.getElement().remove();
    filmPopupComponent.removeElement();
  };

  const onClosePopupCloseKeyPress = (evt) => {
    const isEsc = evt.key === `Escape` || evt.key === `Esc`;

    if (isEsc) {
      closePopup();
      document.removeEventListener(`keydown`, onClosePopupCloseKeyPress);
    }
  };

  const onClosePopupClick = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  const onOpenPopup = (evt) => {
    evt.preventDefault();

    render(bodyElement, filmPopupComponent.getElement(), RenderPosition.BEFORE_END);
    const closeButtonElement = filmPopupComponent.getElement().querySelector(`.film-details__close-btn`);

    closeButtonElement.addEventListener(`click`, onClosePopupClick);
    document.addEventListener(`keydown`, onClosePopupCloseKeyPress);
  };

  const movieComponent = new MovieComponent(movie);
  const titleElement = movieComponent.getElement().querySelector(`.film-card__title`);
  const posterElement = movieComponent.getElement().querySelector(`.film-card__poster`);
  const commentLinkElement = movieComponent.getElement().querySelector(`.film-card__comments`);

  titleElement.addEventListener(`click`, onOpenPopup);
  posterElement.addEventListener(`click`, onOpenPopup);
  commentLinkElement.addEventListener(`click`, onOpenPopup);

  const filmPopupComponent = new MoviePopupComponent(movie);

  render(movieListElement, movieComponent.getElement(), RenderPosition.BEFORE_END);
};

const renderExtraMovie = (movieMainComponent, movies, title) => {
  const filmExtraComponent = new FilmExtraComponent(title);
  render(movieMainComponent.getElement(), filmExtraComponent.getElement(), RenderPosition.BEFORE_END);
  render(filmExtraComponent.getElement(), new MovieContainerComponent().getElement(), RenderPosition.BEFORE_END);
  const movieExtraContainer = filmExtraComponent.getElement().querySelector(`.films-list__container`);

  movies.forEach((movie) => {
    renderMovie(movieExtraContainer, movie);
  });
};

const renderMovieMain = (movieMainComponent, movies) => {
  if (movies.length === 0) {
    render(movieMainComponent.getElement(), new NoDataComponent().getElement(), RenderPosition.BEFORE_END);
    return;
  }

  render(movieMainComponent.getElement(), new MovieListComponent().getElement(), RenderPosition.BEFORE_END);

  const movieListElement = movieMainComponent.getElement().querySelector(`.films-list`);
  render(movieListElement, new MovieContainerComponent().getElement(), RenderPosition.BEFORE_END);

  let showMovieStart = MOVIE_SHOW_START;
  const movieListContainerElement = movieMainComponent.getElement().querySelector(`.films-list__container`);

  movies.slice(0, showMovieStart).forEach((movie) => {
    renderMovie(movieListContainerElement, movie);
  });

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(movieListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFORE_END);

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevMovieShowCount = showMovieStart;
    showMovieStart = showMovieStart + SHOWING_MOVIE_COUNT_BY_BUTTON;

    movies.slice(prevMovieShowCount, showMovieStart).forEach((movie) => {
      renderMovie(movieListContainerElement, movie);
    });

    if (showMovieStart >= movies.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });

  const moviesTopRated = getTopRatingMovies(movies.slice());
  const moviesMostCommented = getMostCommentedFilms(movies.slice());

  if (moviesTopRated[0].rating !== 0) {
    renderExtraMovie(movieMainComponent, moviesTopRated, ExtraMovieTitle.TOP_RATED);
  }

  if (moviesMostCommented[0].comments.length !== 0) {
    renderExtraMovie(movieMainComponent, moviesMostCommented, ExtraMovieTitle.MOST_COMMENTED);
  }

};

const movies = getMovies(MOVIE_COUNT);
const menu = getMenu();

const headerElement = document.querySelector(`.header`);
const userRank = movies.length !== 0 ? movies[0].userDetails.personalRating : 0;
render(headerElement, new UserRankComponent(userRank).getElement(), RenderPosition.BEFORE_END);

const mainElement = document.querySelector(`.main`);
render(mainElement, new MenuComponent(menu).getElement(), RenderPosition.BEFORE_END);

render(mainElement, new SortComponent().getElement(), RenderPosition.BEFORE_END);

const movieMainComponent = new MovieMainComponent();
render(mainElement, movieMainComponent.getElement(), RenderPosition.BEFORE_END);
renderMovieMain(movieMainComponent, movies);

const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStatisticsComponent(movies.length).getElement(), RenderPosition.BEFORE_END);
