import AbstractComponent from "./abstract-component";

const createMovieContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

class MovieContainer extends AbstractComponent {
  getTemplate() {
    return createMovieContainerTemplate();
  }
}

export default MovieContainer;
