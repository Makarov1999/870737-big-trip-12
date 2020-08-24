import {prepareDateToDay, createElement} from "../util.js";
const createTripInfoTemplate = (route, cost, startDate, finishDate) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>

        <p class="trip-info__dates">${prepareDateToDay(startDate)}&nbsp;&mdash;&nbsp;${prepareDateToDay(finishDate)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
};

export default class TripView {
  constructor(route, cost, startDate, finishDate) {
    this._element = null;
    this._route = route;
    this._cost = cost;
    this._startDate = startDate;
    this._finishDate = finishDate;
  }

  getTemplate() {
    return createTripInfoTemplate(this._route, this._cost, this._startDate, this._finishDate);
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
