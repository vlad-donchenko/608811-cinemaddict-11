import {remove, render, RenderPosition} from "../utils/render";
import MovieComponent from "../components/movie";
import MoviePopupComponent from "../components/movie-popup";

class MovieController {
  constructor(container) {
    this._container = container;

    this._moviePopupComponent = null;
    this._movieComponent = null;
    this._bodyElement = document.querySelector(`body`);
    this._onClosePopupCloseKeyPress = this._onClosePopupCloseKeyPress.bind(this);
  }

  render(movie) {
    this._movieComponent = new MovieComponent(movie);
    this._moviePopupComponent = new MoviePopupComponent(movie);

    this._movieComponent.setTitleClickHandler((evt) => {
      evt.preventDefault();
      this._onOpenPopupClick();
    });
    this._movieComponent.setPosterClickHandler((evt) => {
      evt.preventDefault();
      this._onOpenPopupClick();
    });
    this._movieComponent.setCommentClickHandler((evt) => {
      evt.preventDefault();
      this._onOpenPopupClick();
    });

    this._moviePopupComponent.setCloseButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onClosePopupClick();
      document.removeEventListener(`keydown`, this._onClosePopupCloseKeyPress);
    });

    render(this._container, this._movieComponent, RenderPosition.BEFORE_END);
  }

  _onOpenPopupClick() {
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
