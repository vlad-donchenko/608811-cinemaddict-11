import {ExtraMovieTitle, MOVIE_SHOW_START, SHOWING_MOVIE_COUNT_BY_BUTTON} from "../const";
import {remove, render, RenderPosition} from "../utils/render";
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
import MovieController from "./movie";

const menu = getMenu();

const renderExtraMovie = (movieMainComponent, movies, title) => {
  const filmExtraComponent = new FilmExtraComponent(title);
  const filmsListExtraElement = filmExtraComponent.getElement();
  render(movieMainComponent, filmExtraComponent, RenderPosition.BEFORE_END);

  const movieContainerComponent = new MovieContainerComponent();
  render(filmsListExtraElement, movieContainerComponent, RenderPosition.BEFORE_END);

  const movieExtraContainer = movieContainerComponent.getElement();

  renderMovies(movieExtraContainer, movies);
};

const renderMovies = (movieListElement, movies, onDataChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(movieListElement, onDataChange);
    movieController.render(movie);
    return movieController;
  });
};

const getSortedMovies = (sortType, movies, from, to) => {
  let sortedMovies = [];
  const showingMovies = movies.slice();

  switch (sortType) {
    case SortType.SORT_DATE:
      sortedMovies = showingMovies.sort((a, b) => {
        return b.releaseDate - a.releaseDate;
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
    this._movies = [];
    this._showedMovieControllers = [];
    this._showMovieCount = MOVIE_SHOW_START;
    this._movieContainerComponent = new MovieContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._movieListComponent = new MovieListComponent();
    this._noDataComponent = new NoDataComponent();
    this._menuComponent = new MenuComponent(menu);
    this._movieMainComponent = new MovieMainComponent();
    this._sortComponent = new SortComponent();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(movies) {
    this._movies = movies;
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

    const movieListContainerElement = this._movieContainerComponent.getElement();

    const newMovies = renderMovies(movieListContainerElement, movies.slice(0, this._showMovieCount), this._onDataChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);
    this._renderShowMoreButton();

    const moviesTopRated = getTopRatingMovies(movies.slice());
    const moviesMostCommented = getMostCommentedFilms(movies.slice());


    if (moviesTopRated[0].rating !== 0) {
      renderExtraMovie(filmsElement, moviesTopRated, ExtraMovieTitle.TOP_RATED);
    }

    if (moviesMostCommented[0].comments.length !== 0) {
      renderExtraMovie(filmsElement, moviesMostCommented, ExtraMovieTitle.MOST_COMMENTED);
    }
  }

  _onSortTypeChange(sortType) {
    this._showMovieCount = MOVIE_SHOW_START;

    const sortedMovies = getSortedMovies(sortType, this._movies, 0, this._showMovieCount);

    const movieListContainerElement = this._movieContainerComponent.getElement();
    movieListContainerElement.innerHTML = ``;

    const newMovies = renderMovies(movieListContainerElement, sortedMovies, this._onDataChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._movies.findIndex((movie) => movie === oldData);

    if (index === -1) {
      return;
    }

    this._movies = [].concat(this._movies.slice(0, index), newData, this._movies.slice(index + 1));
    movieController.render(this._movies[index]);
  }

  _renderShowMoreButton() {
    if (this._showMovieCount >= this._movies.length) {
      return;
    }

    remove(this._showMoreButtonComponent);

    const movieListElement = this._movieListComponent.getElement();
    render(movieListElement, this._showMoreButtonComponent, RenderPosition.BEFORE_END);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMovieShowCount = this._showMovieCount;
      this._showMovieCount = this._showMovieCount + SHOWING_MOVIE_COUNT_BY_BUTTON;

      const sortedMovies = getSortedMovies(this._sortComponent.getSortType(), this._movies, prevMovieShowCount, this._showMovieCount);

      const movieListContainerElement = this._movieContainerComponent.getElement();

      const newMovies = renderMovies(movieListContainerElement, sortedMovies, this._onDataChange);
      this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

      if (this._showMovieCount >= this._movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }
}

export default PageController;
