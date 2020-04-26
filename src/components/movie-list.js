import AbstractComponent from "./abstract-component";

const createMovieListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

class MovieList extends AbstractComponent {
  getTemplate() {
    return createMovieListTemplate();
  }
}

export default MovieList;
