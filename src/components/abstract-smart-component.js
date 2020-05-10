import AbstractComponent from "./abstract-component";

const HIDDEN_CLASS = `visually-hidden`;

class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    const {scrollTop, scrollLeft} = oldElement;

    this.removeElement();

    const newElement = this.getElement();

    newElement.style.animationDuration = `0s`;

    parent.replaceChild(newElement, oldElement);

    newElement.scrollTop = scrollTop;
    newElement.scrollLeft = scrollLeft;

    this.recoveryListeners();
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }
}

export default AbstractSmartComponent;
