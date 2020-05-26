import {MovieShowSetting, ExtraMovieTitle} from "../const";
import {remove, render, RenderPosition} from "../utils/render";
import FilmExtraComponent from "../components/film-extra";
import MovieContainerComponent from "../components/movie-container";
import NoDataComponent from "../components/no-data";
import MovieListComponent from "../components/movie-list";
import ShowMoreButtonComponent from "../components/show-more-button";
import {SortType} from "../components/sorting";
import MovieMainComponent from "../components/movie-main";
import MovieController from "./movie";

const renderMovies = (movieListElement, movies, onDataChange, onViewChange) => {
  return movies.map((movie) => {
    const movieController = new MovieController(movieListElement, onDataChange, onViewChange);
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
        return Number(new Date(b.releaseDate)) - Number(new Date(a.releaseDate));
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
  constructor(container, moviesModel, api, sortComponent) {
    this.api = api;
    this._container = container;
    this._moviesModel = moviesModel;
    this._showedMovieControllers = [];
    this._showMovieCount = MovieShowSetting.START;
    this._mostCommentedContainer = null;
    this._topReatedContainer = null;
    this._movieContainerComponent = new MovieContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._movieListComponent = new MovieListComponent();
    this._noDataComponent = new NoDataComponent();
    this._movieMainComponent = new MovieMainComponent();
    this._sortComponent = sortComponent;
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._moviesModel.setFilterChange(this._onFilterChange);
  }

  render() {
    const movies = this._moviesModel.getMovies();
    const container = this._container;

    this._rerenderSortComponent();

    render(container, this._movieMainComponent, RenderPosition.BEFORE_END);

    const filmsElement = this._movieMainComponent.getElement();

    if (movies.length === 0) {
      render(filmsElement, this._noDataComponent, RenderPosition.BEFORE_END);
      return;
    }

    render(filmsElement, this._movieListComponent, RenderPosition.BEFORE_END);

    const movieListElement = this._movieListComponent.getElement();
    render(movieListElement, this._movieContainerComponent, RenderPosition.BEFORE_END);

    this._renderMovies(movies.slice(0, this._showMovieCount));
    this._renderShowMoreButton();

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _rerenderSortComponent() {
    remove(this._sortComponent);
    render(this._container, this._sortComponent, RenderPosition.BEFORE_END);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  hide() {
    this._sortComponent.hide();
    this._movieMainComponent.hide();
  }

  show() {
    this._sortComponent.show();
    this._movieMainComponent.show();
  }


  _removeMovies() {
    this._showedMovieControllers.forEach((showedMovieController) => showedMovieController.destroy());
    this._showedMovieControllers = [];
  }

  _renderMovies(movies, container) {
    const movieListContainerElement = container || this._movieContainerComponent.getElement();
    const newMovies = renderMovies(movieListContainerElement, movies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

    this._showMovieCount = this._showedMovieControllers.length;
  }

  _createNewExtraContainer(title) {
    const filmExtraComponent = new FilmExtraComponent(title);

    if (title === ExtraMovieTitle.MOST_COMMENTED) {
      this._mostCommentedContainer = filmExtraComponent;
    } else {
      this._topReatedContainer = filmExtraComponent;
    }

    const filmsListExtraElement = filmExtraComponent.getElement();
    render(this._movieMainComponent.getElement(), filmExtraComponent, RenderPosition.BEFORE_END);

    const movieContainerComponent = new MovieContainerComponent();
    render(filmsListExtraElement, movieContainerComponent, RenderPosition.BEFORE_END);

    return movieContainerComponent.getElement();
  }

  _removeExtraFilmContainer(element) {
    remove(element);
  }

  _renderMostCommentedFilms() {
    const movies = this._moviesModel.getMostCommentedMovies();
    const container = this._createNewExtraContainer(ExtraMovieTitle.MOST_COMMENTED);

    if (movies[0].comments.length !== 0) {
      renderMovies(container, movies, this._onDataChange, this._onViewChange);
    }
  }

  _renderTopRatedFilms() {
    const movies = this._moviesModel.getTopRatedMovies();
    const container = this._createNewExtraContainer(ExtraMovieTitle.TOP_RATED);

    if (movies[0].comments.length !== 0) {
      renderMovies(container, movies, this._onDataChange, this._onViewChange);
    }
  }

  _updateMovies(count) {
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, count));
    this._renderShowMoreButton();

    this._removeExtraFilmContainer(this._mostCommentedContainer);
    this._removeExtraFilmContainer(this._topReatedContainer);

    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _onSortTypeChange(sortType) {
    this._showMovieCount = MovieShowSetting.START;

    const sortedMovies = getSortedMovies(sortType, this._moviesModel.getMovies(), 0, this._showMovieCount);

    const movieListContainerElement = this._movieContainerComponent.getElement();
    movieListContainerElement.innerHTML = ``;

    const newMovies = renderMovies(movieListContainerElement, sortedMovies, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMovies);

    this._renderShowMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    if (newData === null) {
      const deleteCommentId = movieController.getDeleteCommentId();
      const refreshedData = oldData;
      refreshedData.comments = refreshedData.comments.filter((comment) => {
        return comment.id !== deleteCommentId;
      });

      this.api.deleteComment(deleteCommentId)
        .then(() => {
          const isSuccess = this._moviesModel.updateMovie(oldData.id, refreshedData);

          if (isSuccess) {
            movieController.render(refreshedData);
            this._updateMovies(this._showMovieCount);
          }
        });
    } else if (oldData === null) {
      this.api.createComment(newData)
        .then((MovieModel) => {
          const isSuccess = this._moviesModel.updateMovie(MovieModel.id, MovieModel);

          if (isSuccess) {
            movieController.render(MovieModel);
            this._updateMovies(this._showMovieCount);
          }
        })
        .catch(() => {
          movieController.resetAddedComment();
          movieController.unLockedCommentForm();
          movieController.shake();
        });
    } else {
      this.api.updateMovie(oldData.id, newData)
        .then((movieModel) => {
          const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);
          if (isSuccess) {
            movieController.render(movieModel);
            this._updateMovies(this._showMovieCount);
          }
        });
    }
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showMovieCount >= this._moviesModel.getMovies().length) {
      return;
    }

    const movieListElement = this._movieListComponent.getElement();
    render(movieListElement, this._showMoreButtonComponent, RenderPosition.BEFORE_END);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const prevMovieShowCount = this._showMovieCount;
    const movies = this._moviesModel.getMovies();
    this._showMovieCount = this._showMovieCount + MovieShowSetting.BY_BUTTON;

    const sortedMovies = getSortedMovies(this._sortComponent.getSortType(), movies, prevMovieShowCount, this._showMovieCount);
    this._renderMovies(sortedMovies);

    if (this._showMovieCount >= this._moviesModel.getMovies().length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((movie) => movie.setDefaultView());
  }

  _onFilterChange() {
    this._sortComponent.setSortType(SortType.DEFAULT);
    this._updateMovies(MovieShowSetting.START);
  }
}

export default PageController;
