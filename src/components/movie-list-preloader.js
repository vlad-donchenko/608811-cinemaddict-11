import AbstractSmartComponent from "./abstract-smart-component";

const getMovieListPreloader = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>`
  );
};

class MovieListPreloader extends AbstractSmartComponent {
  getTemplate() {
    return getMovieListPreloader();
  }
}

export default MovieListPreloader;
