import {ExtraMovieTitle, MOVIE_SHOW_START, SHOWING_MOVIE_COUNT_BY_BUTTON} from "../const";
import {remove, render, RenderPosition} from "../utils/render";
import MovieComponent from "../components/movie";
import MoviePopupComponent from "../components/movie-popup";
import FilmExtraComponent from "../components/film-extra";
import MovieContainerComponent from "../components/movie-container";
import NoDataComponent from "../components/no-data";
import MovieListComponent from "../components/movie-list";
import ShowMoreButtonComponent from "../components/show-more-button";
import {getMostCommentedFilms, getTopRatingMovies} from "../utils/common";
import MenuComponent from "../components/menu";
import SortComponent, {SortType} from "../components/sorting";
import MovieMainComponent from "../components/movie-main";
import {getMenu} from "../mock/filter";

const menu = getMenu();

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

const renderMovies = (movieListElement, movies) => {
  movies.forEach((movie) => {
    renderMovie(movieListElement, movie);
  });
};

const getSortedMovies = (sortType, movies, from, to) => {
  let sortedMovies = [];
  const showingMovies = movies.slice();

  switch (sortType) {
    case SortType.SORT_DATE:
      sortedMovies = showingMovies.sort((a, b) => {
        return b.release.date - a.release.date;
      });
      break;
    case SortType.SORT_RATING:
      sortedMovies = showingMovies.sort((a, b) => {
        return b.rating - a.rating;
      });
      break;
    case SortType.DEFAULT:
      sortedMovies = showingMovies;
      break;
  }

  return sortedMovies.slice(from, to);
};

class PageController {
  constructor(container) {
    this._container = container;

    this._movieContainerComponent = new MovieContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._movieListComponent = new MovieListComponent();
    this._noDataComponent = new NoDataComponent();
    this._menuComponent = new MenuComponent(menu);
    this._sortComponent = new SortComponent();
    this._movieMainComponent = new MovieMainComponent();
  }

  render(movies) {
    const renderShowMoreButton = () => {
      if (showMovieCount >= movies.length) {
        return;
      }

      render(movieListElement, this._showMoreButtonComponent, RenderPosition.BEFORE_END);

      this._showMoreButtonComponent.setClickHandler(() => {
        console.log(`was click`);
        const prevMovieShowCount = showMovieCount;
        showMovieCount = showMovieCount + SHOWING_MOVIE_COUNT_BY_BUTTON;
        const sortedMovies = getSortedMovies(this._sortComponent.getSortType(), movies, prevMovieShowCount, showMovieCount);

        renderMovies(movieListContainerElement, sortedMovies);

        if (showMovieCount >= movies.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const container = this._container;

    render(container, this._menuComponent, RenderPosition.BEFORE_END);
    render(container, this._sortComponent, RenderPosition.BEFORE_END);
    render(container, this._movieMainComponent, RenderPosition.BEFORE_END);

    const filmsElement = this._movieMainComponent.getElement();

    if (movies.length === 0) {
      render(filmsElement, this._noDataComponent, RenderPosition.BEFORE_END);
      return;
    }

    render(filmsElement, this._movieListComponent, RenderPosition.BEFORE_END);

    const movieListElement = this._movieListComponent.getElement();
    render(movieListElement, this._movieContainerComponent, RenderPosition.BEFORE_END);

    let showMovieCount = MOVIE_SHOW_START;
    const movieListContainerElement = this._movieContainerComponent.getElement();

    renderMovies(movieListContainerElement, movies.slice(0, showMovieCount));
    renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showMovieCount = MOVIE_SHOW_START;

      const sortedMovies = getSortedMovies(sortType, movies, 0, showMovieCount);

      movieListContainerElement.innerHTML = ``;

      renderMovies(movieListContainerElement, sortedMovies);
      renderShowMoreButton();
    });

    const moviesTopRated = getTopRatingMovies(movies.slice());
    const moviesMostCommented = getMostCommentedFilms(movies.slice());


    if (moviesTopRated[0].rating !== 0) {
      renderExtraMovie(filmsElement, moviesTopRated, ExtraMovieTitle.TOP_RATED);
    }

    if (moviesMostCommented[0].comments.length !== 0) {
      renderExtraMovie(filmsElement, moviesMostCommented, ExtraMovieTitle.MOST_COMMENTED);
    }
  }
}

export default PageController;
