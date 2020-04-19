import {EXTRA_MOVIE_COUNT, MONTH_NAMES} from "../const";

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
  const hour = Math.floor(filmDuration / 60);
  const minutes = filmDuration - 60 * hour;

  return `${hour > 0 ? `${hour}h` : ``} ${minutes > 0 ? `${minutes}m` : ``}`;
};

const formatReleaseDate = (date) => {
  const targetDate = new Date(date);
  const day = targetDate.getDate();
  const month = MONTH_NAMES[targetDate.getMonth()];
  const year = targetDate.getFullYear();

  return `${day} ${month} ${year}`;
};

const formatCommentDate = (date) => {
  const targetDate = new Date(date);
  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;
  const year = targetDate.getFullYear();
  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();

  return `${year}/${month}/${day} ${hours} : ${minutes}`;
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

export {getTopRatingMovies, randomInteger, getRandomArrayItem, getCommentTitles, formatFilmDuration, getMostCommentedFilms, convertsArrayToString, getCurrentComment, formatReleaseDate, formatCommentDate, getUserRankTitle};
