import {prepareDateToDay} from "../utils/date.js";
import AbstractView from "./abstract.js";
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

export default class TripInfoView extends AbstractView {
  constructor(route, cost, startDate, finishDate) {
    super();
    this._route = route;
    this._cost = cost;
    this._startDate = startDate;
    this._finishDate = finishDate;
  }

  getTemplate() {
    return createTripInfoTemplate(this._route, this._cost, this._startDate, this._finishDate);
  }
}
