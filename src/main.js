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
import {RenderPosition, render, remove} from "./utils/render";

const renderMovie = (movieListElement, movie) => {
  const bodyElement = document.querySelector(`body`);

  const closePopup = () => {
    document.removeEventListener(`keydown`, onClosePopupCloseKeyPress);
    remove(filmPopupComponent);
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

    render(bodyElement, filmPopupComponent, RenderPosition.BEFORE_END);

    filmPopupComponent.setCloseButtonClickHandler(onClosePopupClick);
    document.addEventListener(`keydown`, onClosePopupCloseKeyPress);
  };

  const movieComponent = new MovieComponent(movie);

  movieComponent.setTitleClickHandler(onOpenPopup);
  movieComponent.setPosterClickHandler(onOpenPopup);
  movieComponent.setCommentClickHandler(onOpenPopup);

  const filmPopupComponent = new MoviePopupComponent(movie);

  render(movieListElement, movieComponent, RenderPosition.BEFORE_END);
};

const renderExtraMovie = (movieMainComponent, movies, title) => {
  const filmExtraComponent = new FilmExtraComponent(title);
  render(movieMainComponent.getElement(), filmExtraComponent, RenderPosition.BEFORE_END);
  const movieContainerComponent = new MovieContainerComponent();
  render(filmExtraComponent.getElement(), movieContainerComponent, RenderPosition.BEFORE_END);
  const movieExtraContainer = movieContainerComponent.getElement();

  movies.forEach((movie) => {
    renderMovie(movieExtraContainer, movie);
  });
};

const renderMovieMain = (movieMainComponent, movies) => {
  if (movies.length === 0) {
    render(movieMainComponent.getElement(), new NoDataComponent(), RenderPosition.BEFORE_END);
    return;
  }

  const movieListComponent = new MovieListComponent();
  render(movieMainComponent.getElement(), movieListComponent, RenderPosition.BEFORE_END);

  const movieListElement = movieListComponent.getElement();
  const movieContainerComponent = new MovieContainerComponent();
  render(movieListElement, movieContainerComponent, RenderPosition.BEFORE_END);

  let showMovieStart = MOVIE_SHOW_START;
  const movieListContainerElement = movieContainerComponent.getElement();

  movies.slice(0, showMovieStart).forEach((movie) => {
    renderMovie(movieListContainerElement, movie);
  });

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(movieListElement, showMoreButtonComponent, RenderPosition.BEFORE_END);

  showMoreButtonComponent.setClickHandler(() => {
    const prevMovieShowCount = showMovieStart;
    showMovieStart = showMovieStart + SHOWING_MOVIE_COUNT_BY_BUTTON;

    movies.slice(prevMovieShowCount, showMovieStart).forEach((movie) => {
      renderMovie(movieListContainerElement, movie);
    });

    if (showMovieStart >= movies.length) {
      remove(showMoreButtonComponent);
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
render(headerElement, new UserRankComponent(userRank), RenderPosition.BEFORE_END);

const mainElement = document.querySelector(`.main`);
render(mainElement, new MenuComponent(menu), RenderPosition.BEFORE_END);

render(mainElement, new SortComponent(), RenderPosition.BEFORE_END);

const movieMainComponent = new MovieMainComponent();
render(mainElement, movieMainComponent, RenderPosition.BEFORE_END);
renderMovieMain(movieMainComponent, movies);

const footerElement = document.querySelector(`.footer`);
render(footerElement, new FooterStatisticsComponent(movies.length), RenderPosition.BEFORE_END);
