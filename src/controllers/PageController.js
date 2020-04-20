import {remove, render, RenderPosition} from "../utils/render";
import MovieComponent from "../components/movie";
import MoviePopupComponent from "../components/movie-popup";
import FilmExtraComponent from "../components/film-extra";
import MovieContainerComponent from "../components/movie-container";
import NoDataComponent from "../components/no-data";
import MovieListComponent from "../components/movie-list";
import {ExtraMovieTitle, MOVIE_SHOW_START, SHOWING_MOVIE_COUNT_BY_BUTTON} from "../const";
import ShowMoreButtonComponent from "../components/show-more-button";
import {getMostCommentedFilms, getTopRatingMovies} from "../utils/common";

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
  const filmsListExtraElement = filmExtraComponent.getElement();
  render(movieMainComponent, filmExtraComponent, RenderPosition.BEFORE_END);

  const movieContainerComponent = new MovieContainerComponent();
  render(filmsListExtraElement, movieContainerComponent, RenderPosition.BEFORE_END);

  const movieExtraContainer = movieContainerComponent.getElement();

  movies.forEach((movie) => {
    renderMovie(movieExtraContainer, movie);
  });
};

class PageController {
  constructor(container) {
    this._container = container;
  }

  render(movies) {
    const container = this._container.getElement();

    if (movies.length === 0) {
      render(container, new NoDataComponent(), RenderPosition.BEFORE_END);
      return;
    }

    const movieListComponent = new MovieListComponent();
    render(container, movieListComponent, RenderPosition.BEFORE_END);

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
      renderExtraMovie(container, moviesTopRated, ExtraMovieTitle.TOP_RATED);
    }

    if (moviesMostCommented[0].comments.length !== 0) {
      renderExtraMovie(container, moviesMostCommented, ExtraMovieTitle.MOST_COMMENTED);
    }
  }
}

export default PageController;
