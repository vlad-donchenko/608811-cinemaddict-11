import {FilterType} from "../const";
import {getMoviesByFilter} from "../utils/filter";

class Movies {
  constructor() {
    this._movies = [];
    this._activeFilterType = FilterType.ALL_MOVIES;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  getMoviesAll() {
    return this._movies;
  }

  getMovies() {
    return getMoviesByFilter(this._activeFilterType, this._movies);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  updateMovie(id, movie) {
    const index = this._movies.findIndex((currentMovie) => currentMovie.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChange(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export default Movies;
