import AbstractComponent from "./AbstractComponent";

const createFilmExtraTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
    </section>`
  );
};

class FilmExtra extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createFilmExtraTemplate(this._title);
  }
}

export default FilmExtra;
