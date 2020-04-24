import {RenderPosition, remove, render, replace} from "../utils/render";
import MovieComponent from "../components/movie";
import MoviePopupComponent from "../components/movie-popup";

class MovieController {
  constructor(container, onDataChange) {
    this._movie = null;
    this._container = container;
    this._onDataChange = onDataChange;
    this._moviePopupComponent = null;
    this._movieComponent = null;
    this._bodyElement = document.querySelector(`body`);
    this._closePopup = this._closePopup.bind(this);
    this._onClosePopupClick = this._onClosePopupClick.bind(this);
    this._onClosePopupCloseKeyPress = this._onClosePopupCloseKeyPress.bind(this);
    this._addWatchListHandler = this._addWatchListHandler.bind(this);
    this._addWatchedHandler = this._addWatchedHandler.bind(this);
    this._addFavoriteHandler = this._addFavoriteHandler.bind(this);
  }

  render(movie) {
    this._movie = movie;

    const oldMovieComponent = this._movieComponent;
    const oldMoviePopupComponent = this._moviePopupComponent;

    this._movieComponent = this._getMovie(movie);
    this._moviePopupComponent = this._getMoviePopup(movie);

    if (oldMovieComponent && oldMoviePopupComponent) {
      replace(this._movieComponent, oldMovieComponent);
      replace(this._moviePopupComponent, oldMoviePopupComponent);
    } else {
      render(this._container, this._movieComponent, RenderPosition.BEFORE_END);
    }
  }

  _getMovie(movie) {
    const movieComponent = new MovieComponent(movie);

    movieComponent.setTitleClickHandler((evt) => {
      evt.preventDefault();
      this._onOpenPopupClick();
    });

    movieComponent.setPosterClickHandler((evt) => {
      evt.preventDefault();
      this._onOpenPopupClick();
    });

    movieComponent.setCommentClickHandler((evt) => {
      evt.preventDefault();
      this._onOpenPopupClick();
    });

    movieComponent.setAddWatchListClickHandler(() => {
      this._addWatchListHandler();
    });

    movieComponent.setAddWatchedClickHandler(() => {
      this._addWatchedHandler();
    });

    movieComponent.setAddFavoriteClickHandler(() => {
      this._addFavoriteHandler();
    });

    return movieComponent;
  }

  _getMoviePopup(movie) {
    const moviePopupComponent = new MoviePopupComponent(movie);

    moviePopupComponent.setCloseButtonClickHandler(() => {
      this._onClosePopupClick();
      document.removeEventListener(`keydown`, this._onClosePopupCloseKeyPress);
    });

    moviePopupComponent.setAddWatchListChangeHandler(() => {
      this._addWatchListHandler();
    });

    moviePopupComponent.setAddWatchedChangeHandler(() => {
      this._addWatchedHandler();
    });

    moviePopupComponent.setAddFavoriteChangeHandler(() => {
      this._addFavoriteHandler();
    });

    return moviePopupComponent;
  }

  _addWatchListHandler() {
    this._onDataChange(this, this._movie, Object.assign({}, this._movie, {
      watchlist: !this._movie.watchlist
    }));
  }

  _addWatchedHandler() {
    this._onDataChange(this, this._movie, Object.assign({}, this._movie, {
      alreadyWatched: !this._movie.alreadyWatched
    }));
  }

  _addFavoriteHandler() {
    this._onDataChange(this, this._movie, Object.assign({}, this._movie, {
      favorite: !this._movie.favorite
    }));
  }

  _onOpenPopupClick() {
    this._moviePopupComponent = this._getMoviePopup(this._movie);
    render(this._bodyElement, this._moviePopupComponent, RenderPosition.BEFORE_END);
    document.addEventListener(`keydown`, this._onClosePopupCloseKeyPress);
  }

  _onClosePopupClick() {
    this._closePopup();
  }

  _onClosePopupCloseKeyPress(evt) {
    const isEsc = evt.key === `Escape` || evt.key === `Esc`;

    if (isEsc) {
      this._closePopup();
      document.removeEventListener(`keydown`, this._onClosePopupCloseKeyPress);
    }
  }

  _closePopup() {
    document.removeEventListener(`keydown`, this._onClosePopupCloseKeyPress);
    remove(this._moviePopupComponent);
  }
}

export default MovieController;
