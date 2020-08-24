import {createElement} from "../util.js";
const createCaptionTemplate = (text) => {
  return (
    `<h2 class="visually-hidden">${text}</h2>`
  );
};

export default class CaptionView {
  constructor(text) {
    this._element = null;
    this._text = text;
  }

  getTemplate() {
    return createCaptionTemplate();
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
