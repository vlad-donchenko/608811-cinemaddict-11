import AbstractComponent from "./abstract-component";

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
}

export default AbstractSmartComponent;
