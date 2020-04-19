import {createElement} from "../utils";

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._elemen) {
      this._elemen = createElement(this.getTemplate());
    }

    return this._elemen;
  }

  removeElement() {
    this._element = null;
  }
}

export default AbstractComponent;
