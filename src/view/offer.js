import AbstractView from "./abstract.js";
export const createOfferFormTemplate = (offer) => {
  return (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name.toLowerCase()}-1" type="checkbox" name="event-offer-luggage" ${offer.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.name.toLowerCase()}-1">
          <span class="event__offer-title">${offer.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
        </label>
      </div>`
  );
};

export default class OfferView extends AbstractView {
  constructor(offer) {
    super();
    this._offer = offer;
  }

  getTemplate() {
    return createOfferFormTemplate(this._offer);
  }
}
