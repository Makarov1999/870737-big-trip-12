import AbstractView from "./abstract.js";
const createCaptionTemplate = (text) => {
  return (
    `<h2 class="visually-hidden">${text}</h2>`
  );
};

export default class CaptionView extends AbstractView {
  constructor(text) {
    super();
    this._text = text;
  }

  getTemplate() {
    return createCaptionTemplate(this._text);
  }
}
