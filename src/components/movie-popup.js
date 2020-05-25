import {KeyName, ButtonDeleteName} from "../const";
import AbstractSmartComponent from "./abstract-smart-component";
import {convertsArrayToString, formatFilmDuration, formatReleaseDate, formatCommentDate} from "../utils/common";
import {encode} from "he";

const createGenreMarkUp = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }).join(`\n`);
};

const createCommentMarkUp = (commentItems, deleteCommentId, deleteButtonName) => {
  return commentItems.map((commentItem) => {
    const {id, author, comment, emotion, date} = commentItem;
    const commentDate = formatCommentDate(date);
    return (
      `<li class="film-details__comment" id="${id}">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${encode(comment)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${commentDate}</span>
            <button type="button" class="film-details__comment-delete">${deleteCommentId !== id ? ButtonDeleteName.DELETE : deleteButtonName}</button>
          </p>
        </div>
      </li>`
    );
  }).join(`\n`);
};

const createFilmPopupTemplate = (movie, commentEmoji, deleteCommentId, deleteButtonName, newCommentText) => {
  const {title, poster, rating, description, ageRating, comments, director, writers, actors, genre, releaseCountry, releaseDate, alternativeTitle, runtime, watchlist, favorite, alreadyWatched} = movie;

  const duration = formatFilmDuration(runtime);
  const commentMarkUp = comments ? createCommentMarkUp(comments, deleteCommentId, deleteButtonName) : ``;
  const commentsCount = comments.length;

  const directorsTitle = convertsArrayToString(director, `, `);
  const writersTitle = convertsArrayToString(writers, `, `);
  const actorsTitle = convertsArrayToString(actors, `, `);

  const genreMarkUp = createGenreMarkUp(genre);

  const releaseDateFull = formatReleaseDate(releaseDate);

  const isWatchlist = watchlist ? `checked` : ``;
  const isFavorite = favorite ? `checked` : ``;
  const isAlreadyWatched = alreadyWatched ? `checked` : ``;

  const emojiMarkup = commentEmoji ? `<img src="./images/emoji/${commentEmoji}.png" alt="${commentEmoji}" width="55" height="55">` : ` `;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tbody><tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${directorsTitle}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writersTitle}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsTitle}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDateFull}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genreMarkUp}
                  </td>
                </tr>
              </tbody></table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isAlreadyWatched}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">
              ${commentMarkUp}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">
                <input type="hidden" name="add-emoji" value="${commentEmoji || ``}">
                ${emojiMarkup}
              </div>

              <label class="film-details__comment-label">
                ${newCommentText ?
      `<textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newCommentText}</textarea>` :
      `<textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>`}
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

class MoviePopup extends AbstractSmartComponent {
  constructor(movie) {
    super();
    this._movie = movie;
    this._commentEmoji = null;
    this._closeButtonHandler = null;
    this._addWatchListHandler = null;
    this._addWatchedHandler = null;
    this._addFavoriteHandler = null;
    this._deleteCommentHandler = null;
    this._submitFormKeyPress = null;
    this._deleteButtonName = null;
    this._deleteCommentId = null;
    this._newCommentText = null;
    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonHandler);
    this.setAddWatchListChangeHandler(this._addWatchListHandler);
    this.setAddWatchedChangeHandler(this._addWatchedHandler);
    this.setAddFavoriteChangeHandler(this._addFavoriteHandler);
    this.setDeleteButtonClick(this._deleteCommentHandler);
    this.setSubmitFormKeyPress(this._submitFormKeyPress);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._movie, this._commentEmoji, this._deleteCommentId, this._deleteButtonName, this._newCommentText);
  }

  setData(deleteCommentId, name) {
    this._deleteCommentId = deleteCommentId;
    this._deleteButtonName = name;
    this.rerender();
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeButtonHandler = handler;
  }

  setAddWatchListChangeHandler(handler) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, handler);
    this._addWatchListHandler = handler;
  }

  setAddWatchedChangeHandler(handler) {
    this.getElement().querySelector(`#watched`).addEventListener(`change`, handler);
    this._addWatchedHandler = handler;
  }

  setAddFavoriteChangeHandler(handler) {
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, handler);
    this._addFavoriteHandler = handler;
  }

  setDeleteButtonClick(handler) {
    this.getElement().querySelectorAll(`.film-details__comment`).forEach((comment) => {
      comment.querySelector(`.film-details__comment-delete`).addEventListener(`click`, () => {
        handler(comment.id);
      });
    });

    this._deleteCommentHandler = handler;
  }

  setSubmitFormKeyPress(handler) {
    this.getCommentInputElement().addEventListener(`keydown`, (evt) => {
      const isSend = evt.key === KeyName.ENTER && evt.ctrlKey || evt.keyCode === KeyName.ENTER && evt.metaKey;

      if (isSend) {
        handler(this._newCommentText, this._commentEmoji);
      }

    });

    this._submitFormKeyPress = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      this._commentEmoji = evt.target.value;
      this.rerender();
    });

    this.getCommentInputElement().addEventListener(`input`, (evt) => {
      this._newCommentText = evt.target.value;
    });
  }

  lockedForm() {
    this.getCommentInputElement().setAttribute(`readonly`, `readonly`);
  }

  unLockedForm() {
    this.getCommentInputElement().removeAttribute(`readonly`, `readonly`);
  }

  getCommentInputElement() {
    return this.getElement().querySelector(`.film-details__comment-input`);
  }
}

export default MoviePopup;
