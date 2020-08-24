import {createElement} from "../util.js";
const createRoutePointListTemplate = () => {
  return (`<ul class="trip-events__list"><ul>`);
};

export default class RoutePointListView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createRoutePointListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
