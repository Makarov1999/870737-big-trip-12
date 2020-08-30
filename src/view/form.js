import {ROUTE_POINT_TYPES_FORM} from "../const.js";
import {ROUTE_POINT_GROUPS} from "../const.js";
import {createElement} from "../utils/common.js";
import {setDateToForm} from "../utils/date.js";

const createCitiesFormItems = (cities) => {
  let citiesFormTemlate = ``;
  cities.forEach((city) => {
    citiesFormTemlate += `<option value="${city}"></option>`;
  });
  return citiesFormTemlate;
};

const createOffersFormTemplate = (offers) => {
  let offersTemplate = ``;
  offers.forEach((offer) => {
    offersTemplate += ` <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name.toLowerCase()}-1" type="checkbox" name="event-offer-luggage" ${offer.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.name.toLowerCase()}-1">
          <span class="event__offer-title">${offer.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
        </label>
      </div>`;
  });
  return offersTemplate;
};

const createPhotosFormTemplate = (photos) => {
  let photosFormTemplate = ``;
  photos.forEach((photo) => {
    photosFormTemplate += `<img class="event__photo" src="${photo}" alt="Event photo">`;
  });
  return photosFormTemplate;
};

const createEventFormTypeTemplate = (eventName, isChecked) => {
  const valueEvent = eventName.toLowerCase();
  return (
    `<div class="event__type-item">
      <input id="event-type-${valueEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${valueEvent}" ${isChecked ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${valueEvent}" for="event-type-${valueEvent}-1">${eventName}</label>
    </div>`
  );
};

const createGroupsOfEventsFormTypeTemlate = (groups, checkedEvent = `Flight`) => {
  let eventsTemplate = ``;
  let groupsTemplate = ``;
  groups.forEach((group) => {
    ROUTE_POINT_TYPES_FORM[group].forEach((eventType) => {
      if (checkedEvent === eventType) {
        eventsTemplate += createEventFormTypeTemplate(eventType, true);
      } else {
        eventsTemplate += createEventFormTypeTemplate(eventType, false);
      }
    });
    groupsTemplate += `<fieldset class="event__type-group"><legend class="visually-hidden">${group}</legend>${eventsTemplate}</fieldset>`;
    eventsTemplate = ``;
  });
  return groupsTemplate;
};

export const createFormMarksRouteTemplate = (cities, routePoint) => {
  if (routePoint) {
    const {type, city, info, offers, startTime, finishTime, cost} = routePoint;
    const prepos = (type === `Check-in` || type === `Restaurant` || type === `Sightseeing`) ? `in` : `to`;
    return (
      `<form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              ${createGroupsOfEventsFormTypeTemlate(ROUTE_POINT_GROUPS, type)}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type} ${prepos}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createCitiesFormItems(cities)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${setDateToForm(startTime)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${setDateToForm(finishTime)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">


            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${info.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${createPhotosFormTemplate(info.photos)}
              </div>
            </div>
          </section>
        </section>
      </form>`
    );
  } else {
    return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/bus.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            ${createGroupsOfEventsFormTypeTemlate(ROUTE_POINT_GROUPS)}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Bus to
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createCitiesFormItems(cities)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${setDateToForm(new Date())}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${setDateToForm(new Date())}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
    </form>`);
  }
};
export default class FormView {
  constructor(cities, routePoint) {
    this._element = null;
    this._cities = cities;
    if (routePoint) {
      this._routePoint = routePoint;
    } else {
      this._routePoint = null;
    }
  }

  getTemplate() {
    return createFormMarksRouteTemplate(this._cities, this._routePoint);
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
