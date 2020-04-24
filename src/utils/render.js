const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};
const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFORE_END:
      container.append(component.getElement());
      break;
  }
};
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    const {scrollTop, scrollLeft} = oldElement;

    parentElement.replaceChild(newElement, oldElement);

    newElement.scrollTop = scrollTop;
    newElement.scrollLeft = scrollLeft;
  }
};

export {RenderPosition, createElement, render, remove, replace};
