import {MAX_MOVIE_CARD_DESCRIPTION_LENGTH} from "../const";
import AbstractComponent from "./abstract-component";
import {getCommentTitles, formatFilmDuration} from "../utils/common";

const createMovieTemplate = (movie) => {
  const {title, poster, description, rating, comments, genre, runtime, watchlist, favorite, alreadyWatched, releaseDate} = movie;

  const releaseDateYear = new Date(releaseDate).getFullYear();

  const commentTitle = getCommentTitles(comments.length);
  const duration = formatFilmDuration(runtime);

  const alreadyWatchListClass = watchlist ? `film-card__controls-item--active` : ``;
  const favoriteClass = favorite ? `film-card__controls-item--active` : ``;
  const alreadyWatchedClass = alreadyWatched ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDateYear}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
        <p class="film-card__description">${description.slice(0, MAX_MOVIE_CARD_DESCRIPTION_LENGTH)}</p>
        <a class="film-card__comments">${comments.length} ${commentTitle}</a>
        <form class="film-card__controls">
          <button type="button" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${alreadyWatchListClass}">Add to watchlist</button>
          <button type="button" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedClass}">Mark as watched</button>
          <button type="button" class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClass}">Mark as favorite</button>
        </form>
    </article>`
  );
};

class Movie extends AbstractComponent {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    return createMovieTemplate(this._movie);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }

  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  setCommentClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setAddWatchListClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setAddWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setAddFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}

export default Movie;
