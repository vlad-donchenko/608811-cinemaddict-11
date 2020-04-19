import AbstractComponent from "./AbstractComponent";

const createNoDataTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};

class NoData extends AbstractComponent {
  getTemplate() {
    return createNoDataTemplate();
  }
}

export default NoData;
