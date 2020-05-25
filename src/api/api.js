import MovieModel from "../models/movie";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._movies = [];
    this._movie = null;
  }

  getMovies() {
    return this._load({
      url: `movies`
    })
      .then((response) => response.json())
      .then((movies) => {
        this._movies = movies;
        return Promise.all(movies.map((movie) => this._load({url: `comments/${movie.id}`})));
      })
      .then((response) => {
        return Promise.all(response.map((comment) => comment.json()));
      })
      .then((comments) => {
        this._movies.forEach((movie, index) => {
          movie[`comments`] = comments[index];
        });

        const newMovies = this._movies;
        return newMovies;
      })
      .then(MovieModel.parseMovies);
  }

  updateMovie(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.convertToServer()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then((movie) => {
        this._movie = movie;
        return this._load({url: `comments/${movie.id}`});
      })
      .then((response) => response.json())
      .then((comments) => {
        this._movie[`comments`] = comments;
        const newMovie = this._movie;
        return newMovie;
      })
      .then(MovieModel.parseMovie);
  }

  createComment(data) {
    return this._load({
      url: `comments/${data.id}`,
      method: Method.POST,
      body: JSON.stringify(data.convertCommentToServer()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this._movie = result.movie;
        this._movie[`comments`] = result.comments;
        return this._movie;
      })
      .then(MovieModel.parseMovie);
  }

  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}

export default Api;
