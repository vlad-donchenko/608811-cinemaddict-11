import {EXTRA_MOVIE_COUNT, MAX_MOVIE_CARD_DESCRIPTION_LENGTH} from "../const";
import moment from "moment";
import "moment-duration-format";

const getTopRatingMovies = (movies) => {
  return movies.sort((a, b) => {
    return b.rating - a.rating;
  }).slice(0, EXTRA_MOVIE_COUNT);
};

const getMostCommentedFilms = (movies) => {
  return movies.sort((a, b) => {
    return b.comments.length - a.comments.length;
  }).slice(0, EXTRA_MOVIE_COUNT);
};

const randomInteger = (min, max) => {
  const random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
};

const getCommentTitles = (commentsCount) => {
  return commentsCount > 1 ? `comments` : `comment`;
};

const formatFilmDuration = (filmDuration) => {
  return moment.duration(filmDuration, `minutes`).format(`h[h] m[m]`);
};

const formatReleaseDate = (date) => {
  return moment(date).format(`D MMM YYYY`);
};

const formatReleaseYear = (date) => {
  return moment(date).format(`YYYY`);
};

const formatCommentDate = (date) => {
  return moment(date).fromNow();
};

const convertsArrayToString = (array, separator) => {
  if (!array) {
    return ``;
  }

  return array.length > 0 ? array.join(separator) : array[0];
};

const getUserRankTitle = (watchedMovies) => {
  let rankTitle = `no rank`;

  if (watchedMovies.length >= 1 && watchedMovies.length <= 10) {
    rankTitle = `novice`;
  } else if (watchedMovies.length >= 11 && watchedMovies.length <= 20) {
    rankTitle = `fan`;
  } else if (watchedMovies.length >= 21) {
    rankTitle = `movie buf`;
  }

  return rankTitle;
};

const getDescription = (description) => {
  let editedDescription = description;
  const descriptionLength = editedDescription.length;

  if (descriptionLength > MAX_MOVIE_CARD_DESCRIPTION_LENGTH) {
    editedDescription = editedDescription.slice(0, MAX_MOVIE_CARD_DESCRIPTION_LENGTH - 1).concat(`...`);
  }

  return editedDescription;
};

export {
  getTopRatingMovies,
  getDescription,
  randomInteger,
  getCommentTitles,
  formatFilmDuration,
  getMostCommentedFilms,
  convertsArrayToString,
  formatReleaseDate,
  formatCommentDate,
  getUserRankTitle,
  formatReleaseYear,
};
