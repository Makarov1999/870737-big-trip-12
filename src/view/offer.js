import AbstractView from "./abstract.js";
export const createOfferFormTemplate = (offer, isChecked) => {
  return (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.toLowerCase()}-1" type="checkbox" data-type="offer" name="event-offer-${offer.title.toLowerCase()}" ${isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase()}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
  );
};

export default class OfferView extends AbstractView {
  constructor(offer, isChecked) {
    super();
    this._offer = offer;
    this._isChecked = isChecked;
  }

  getTemplate() {
    return createOfferFormTemplate(this._offer, this._isChecked);
  }
}
