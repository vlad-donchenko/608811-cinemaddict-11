import moment from "moment";

const getUniqueGenres = (movies) => {
  let genres = [];

  movies.slice().forEach((movie) => {
    genres.push(...movie.genre);
  });

  return new Set(genres);
};

const getGenres = (movies) => {
  let genres = [];

  movies.slice().forEach((movie) => {
    genres.push(...movie.genre);
  });

  return genres;
};

const getUniqueGenresInfo = (movies) => {
  const genres = getGenres(movies);
  const uniqueGenres = getUniqueGenres(movies);

  const genresInfo = [];

  for (const uniqueGenre of uniqueGenres) {
    let counter = 0;

    for (const currentGenre of genres) {
      if (uniqueGenre === currentGenre) {
        counter++;
      }
    }

    genresInfo.push({name: uniqueGenre, counter});
  }

  return genresInfo;
};

const getTopGenre = (movies) => {
  const genresInfo = getUniqueGenresInfo(movies);

  const counts = genresInfo.slice().map((genresInfoItem) => genresInfoItem.counter);
  const maxValue = Math.max.apply(null, counts);
  const topGenre = genresInfo.find((genresInfoItem) => genresInfoItem.counter === maxValue);

  return topGenre.name;
};

const getTodayMovies = (movies) => {
  const targetDate = moment().format(`YYYY-MM-DD`);

  return movies.slice().filter((movie) => {
    const watchedDateFormat = moment(movie.watchingDate).format(`YYYY-MM-DD`);
    return moment(targetDate).isSame(watchedDateFormat);
  });
};

const getWeekMovies = (movies) => {
  const dateNow = moment().format(`YYYY-MM-DD`);
  const sevenDaysAgo = moment(new Date()).subtract(7, `days`).format(`YYYY-MM-DD`);

  return movies.slice().filter((movie) => {
    const watchedDateFormat = moment(movie.watchingDate).format(`YYYY-MM-DD`);
    return moment(sevenDaysAgo).isSameOrBefore(watchedDateFormat) && moment(dateNow).isSameOrAfter(watchedDateFormat);
  });
};

const getMonthMovies = (movies) => {
  const dateNow = moment().format(`YYYY-MM-DD`);
  const monthAgo = moment(new Date()).subtract(1, `months`).format(`YYYY-MM-DD`);

  return movies.slice().filter((movie) => {
    const watchedDateFormat = moment(movie.watchingDate).format(`YYYY-MM-DD`);
    return moment(monthAgo).isSameOrBefore(watchedDateFormat) && moment(dateNow).isSameOrAfter(watchedDateFormat);
  });
};

const getYearsMovies = (movies) => {
  const dateNow = moment().format(`YYYY-MM-DD`);
  const yearsAgo = moment(new Date()).subtract(1, `year`).format(`YYYY-MM-DD`);

  return movies.slice().filter((movie) => {
    const watchedDateFormat = moment(movie.watchingDate).format(`YYYY-MM-DD`);
    return moment(yearsAgo).isSameOrBefore(watchedDateFormat) && moment(dateNow).isSameOrAfter(yearsAgo);
  });
};

export {getTodayMovies, getWeekMovies, getYearsMovies, getMonthMovies, getTopGenre, getUniqueGenresInfo};
