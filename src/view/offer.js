import {createElement} from "../util.js";
export const createOfferTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
     </li>`
  );
};

export default class OfferView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createOfferTemplate();
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
