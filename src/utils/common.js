import {EXTRA_MOVIE_COUNT} from "../const";
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

const getRandomArrayItem = (array) => {
  const index = randomInteger(0, array.length - 1);
  return array[index];
};

const getCommentTitles = (commentsCount) => {
  return commentsCount > 1 ? `comment` : `comments`;
};

const getCurrentComment = (commentsId, comments) => {
  let currentComment = [];

  for (const id of commentsId) {
    currentComment.push(comments.find((comment) => {
      return comment.id === id;
    }));
  }

  return currentComment;
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
  return array.length > 0 ? array.join(separator) : array[0];
};

const getUserRankTitle = (rank) => {
  let rankTitle = ``;

  if (rank >= 1 && rank <= 10) {
    rankTitle = `novice`;
  } else if (rank >= 11 && rank <= 20) {
    rankTitle = `fan`;
  } else if (rank >= 21) {
    rankTitle = `movie buf`;
  }

  return rankTitle;
};

export {
  getTopRatingMovies,
  randomInteger,
  getRandomArrayItem,
  getCommentTitles,
  formatFilmDuration,
  getMostCommentedFilms,
  convertsArrayToString,
  getCurrentComment,
  formatReleaseDate,
  formatCommentDate,
  getUserRankTitle,
  formatReleaseYear
};
