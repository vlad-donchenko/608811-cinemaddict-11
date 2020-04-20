import AbstractComponent from "./AbstractComponent";

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
