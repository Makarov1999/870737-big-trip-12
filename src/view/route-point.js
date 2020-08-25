import {getDifferenseInDates, getDuration, createElement} from "../util.js";
import {createOfferTemplate} from "./offer.js";
export const createRoutePointTemplate = (routePoint) => {
  const symbolDateStart = 0;
  const symbolDateStop = 16;
  const {type, city, offers, startTime, finishTime, cost} = routePoint;
  const typeIcon = type.toLowerCase();
  const prepos = (type === `Check` || type === `Restaurant` || type === `Sightseeing`) ? `in` : `to`;
  const startDate = startTime.toISOString().slice(symbolDateStart, symbolDateStop);
  const finishDate = finishTime.toISOString().slice(symbolDateStart, symbolDateStop);
  const routePointTimeStart = startTime.toLocaleString(`ru-RU`, {hour: `numeric`, minute: `numeric`});
  const routePointTimeStop = finishTime.toLocaleString(`ru-RU`, {hour: `numeric`, minute: `numeric`});
  const duration = getDuration(getDifferenseInDates(startTime, finishTime));
  let offersTemplate = ``;
  offers.forEach((offer) => {
    const offerElement = createOfferTemplate(offer);
    offersTemplate += offerElement;
  });
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typeIcon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${prepos} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}">${routePointTimeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${finishDate}">${routePointTimeStop}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${cost}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${offersTemplate}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class RoutePointView {
  constructor(routePoint) {
    this._element = null;
    this._routePoint = routePoint;
  }

  getTemplate() {
    return createRoutePointTemplate(this._routePoint);
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
