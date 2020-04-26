import AbstractComponent from "./abstract-component";

const createMovieMainTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

class MovieMain extends AbstractComponent {
  getTemplate() {
    return createMovieMainTemplate();
  }
}

export default MovieMain;
