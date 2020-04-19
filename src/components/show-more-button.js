import AbstractComponent from "./AbstractComponent";

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

export default ShowMoreButton;
