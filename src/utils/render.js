import AbstractView from "../view/abstract.js";

export const render = (container, element, position) => {
  if (container instanceof AbstractView) {
    container = element.getElement();
  }
  if (element instanceof AbstractView) {
    element = element.getElement();
  }
  switch (position) {
    case `afterbegin`:
      container.prepend(element);
      break;
    case `beforeend`:
      container.append(element);
      break;
  }
};

export const renderElement = (parent, template, position) => {
  parent.insertAdjacentHTML(position, template);
};
