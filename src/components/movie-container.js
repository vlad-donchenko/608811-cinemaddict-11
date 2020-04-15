import {createElement} from "../utils";

const createMovieContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

class MovieContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMovieContainerTemplate();
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

export default MovieContainer;
