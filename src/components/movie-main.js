import {createElement} from "../utils";

const createMovieMainTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

class MovieMain {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMovieMainTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default MovieMain;
