class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.poster = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.rating = data[`film_info`][`total_rating`];
    this.comments = data[`comments`];
    this.genre = data[`film_info`][`genre`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director:`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.releaseDate = data[`film_info`][`release`][`date`];
    this.releaseCountry = data[`film_info`][`release`][`release_country`];
    this.runtime = data[`film_info`][`runtime`];
    this.favorite = data[`user_details`][`favorite`];
    this.watchlist = data[`user_details`][`watchlist`];
    this.alreadyWatched = data[`user_details`][`already_watched`];
    this.watchingDate = data[`user_details`][`watching_date`];
  }

  toRAW() {
    return ({
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.ageRating,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.releaseDate,
          'release_country': this.releaseCountry
        },
        'runtime': this.runtime,
        'description': this.description,
        'genre': this.genre
      },
      'user_details': {
        'watchlist': this.watchlist,
        'already_watched': this.alreadyWatched,
        'watching_date': this.watchingDate,
        'favorite': this.favorite
      }
    });
  }

  convertToServer() {
    return ({
      'id': this.id,
      'comments': this._convertComments(this.comments),
      'film_info': {
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.ageRating,
        'director': this.director || `unknown`,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.releaseDate,
          'release_country': this.releaseCountry
        },
        'runtime': this.runtime,
        'description': this.description,
        'genre': this.genre
      },
      'user_details': {
        'watchlist': this.watchlist,
        'already_watched': this.alreadyWatched,
        'watching_date': this.watchingDate,
        'favorite': this.favorite
      }
    });
  }

  _convertComments(comments) {
    return comments.map((comment) => {
      return comment.id;
    });
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}

export default Movie;
