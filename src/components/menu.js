import AbstractSmartComponent from "./abstract-smart-component";

const createMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
        <a href="#stats" class="main-navigation__additional" id="Stats">Stats</a>
    </nav>`
  );
};

class Menu extends AbstractSmartComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setMenuChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      handler(evt.target.id);
    });
  }
}

export default Menu;
