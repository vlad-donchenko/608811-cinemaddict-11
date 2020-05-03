import {FilterType} from "../const";

const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => {
    return movie.watchlist;
  });
};

const getHistoryMovies = (movies) => {
  return movies.filter((movie) => {
    return movie.alreadyWatched;
  });
};

const getFavoritesMovies = (movies) => {
  return movies.filter((movie) => {
    return movie.favorite;
  });
};

const getMoviesByFilter = (filterType, movies) => {
  switch (filterType) {
    case FilterType.FAVORITES:
      return getFavoritesMovies(movies);
    case FilterType.HISTORY:
      return getHistoryMovies(movies);
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
  }

  return movies;
};

export {getMoviesByFilter};
