import {createElement} from "../utils/common.js";
export default class AbstractView {
  constructor() {
    if (new.target === `AbstractView`) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
    this._element = null;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  getTemplate() {
    throw new Error(`AbstractView method not implemented: getTemplate`);
  }
  removeElement() {
    this._element = null;
  }
}
