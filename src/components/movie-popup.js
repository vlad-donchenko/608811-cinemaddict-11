import AbstractSmartComponent from "./abstract-smart-component";
import {
  getCurrentComment,
  convertsArrayToString,
  formatFilmDuration,
  formatReleaseDate,
  formatCommentDate,
} from "../utils/common";
import {comments} from "../mock/comment";

const createGenreMarkUp = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }).join(`\n`);
};

const createCommentMarkUp = (commentItems) => {
  return commentItems.map((commentItem) => {
    const {author, comment, emotion, date} = commentItem;
    const commentDate = formatCommentDate(date);
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${commentDate}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }).join(`\n`);
};

const createFilmPopupTemplate = (movie, commentEmojiSrc) => {
  const {title, poster, rating, description, comments: commentsId, ageRating, director, writers, actors, genre, releaseCountry, releaseDate, runtime, watchlist, favorite, alreadyWatched} = movie;

  const duration = formatFilmDuration(runtime);

  const currentComments = getCurrentComment(commentsId, comments);
  const commentMarkUp = createCommentMarkUp(currentComments);

  const directorsTitle = convertsArrayToString(director, `, `);
  const writersTitle = convertsArrayToString(writers, `, `);
  const actorsTitle = convertsArrayToString(actors, `, `);

  const genreMarkUp = createGenreMarkUp(genre);

  const releaseDateFull = formatReleaseDate(releaseDate);

  const isWatchlist = watchlist ? `checked` : ``;
  const isFavorite = favorite ? `checked` : ``;
  const isAlreadyWatched = alreadyWatched ? `checked` : ``;

  const emojiMarkup = commentEmojiSrc ? `<img src="./images/emoji/${commentEmojiSrc}.png" alt="${commentEmojiSrc}" width="55" height="55">` : ` `;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${title}</p>
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
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${currentComments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentMarkUp}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${emojiMarkup}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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
    this.commentEmojiSrc = null;
    this._closeButtonHandler = null;
    this._addWatchListHandler = null;
    this._addWatchedHandler = null;
    this._addFavoriteHandler = null;
    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonHandler);
    this.setAddWatchListChangeHandler(this._addWatchListHandler);
    this.setAddWatchedChangeHandler(this._addWatchedHandler);
    this.setAddFavoriteChangeHandler(this._addFavoriteHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._movie, this.commentEmojiSrc);
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

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      this.commentEmojiSrc = evt.target.value;
      this.rerender();
    });
  }
}

export default MoviePopup;
