import {ROUTE_POINT_TYPES_FORM} from "../const.js";
import {ROUTE_POINT_GROUPS} from "../const.js";
import {createElement} from "../utils/common.js";
import {setDateToForm} from "../utils/date.js";
import {render} from "../utils/render.js";
import AbstractView from "./abstract.js";
import OfferView from "../view/offer.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";
const createCitiesFormItems = (cities) => {
  let citiesFormTemlate = ``;
  cities.forEach((city) => {
    citiesFormTemlate += `<option value="${city}"></option>`;
  });
  return citiesFormTemlate;
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
      <input id="event-type-${valueEvent}-1" class="event__type-input  visually-hidden" data-type="type" type="radio" name="event-type" value="${valueEvent}" ${isChecked ? `checked` : ``}>
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
    const {type, city, info, startTime, finishTime, cost, isFavorite} = routePoint;
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
            <input class="event__input  event__input--destination" id="event-destination-1" data-type="city" type="text" name="event-destination" value="${city}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createCitiesFormItems(cities)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${setDateToForm(startTime)}" data-date="${startTime}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${setDateToForm(finishTime)}" data-date="${finishTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" data-type="cost" type="text" name="event-price" value="${cost}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
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
        <button class="event__reset-btn" type="reset">Delete</button>
      </header>
    </form>`);
  }
};
export default class FormView extends AbstractView {
  constructor(cities, routePoint) {
    super();
    this._cities = cities;
    this._datepickerStart = null;
    this._datepickerFinish = null;
    this._submitHandler = this._submitHandler.bind(this);
    this._resetHandler = this._resetHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._finishDateChangeHandler = this._finishDateChangeHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._costChangeHandler = this._costChangeHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);

    if (routePoint) {
      this._routePoint = routePoint;
      this._offers = routePoint.offers;
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
      if (this._routePoint) {
        const offersFormContainer = this._element.querySelector(`.event__available-offers`);
        this._offers.forEach((offer) => {
          const offerFormComponent = new OfferView(offer);
          render(offersFormContainer, offerFormComponent, `beforeend`);
        });
      }
    }
    return this._element;
  }
  _setDatePickerStart(callBack) {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    this._callback.changeStartDate = callBack;
    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          dateFormat: `d/m/y H:i`,
          defaultDate: this._routePoint.startTime,
          onChange: this._startDateChangeHandler,
          enableTime: true,
        }
    );
  }
  _setDatePickerFinish(callBack) {
    if (this._datepickerFinish) {
      this._datepickerFinish.destroy();
      this._datepickerFinish = null;
    }
    this._datepickerFinish = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/y H:i`,
          defaultDate: this._routePoint.finishTime,
          onChange: this._finishDateChangeHandler,
          enableTime: true,
        }
    );
    this._callback.changeFinishDate = callBack;
  }
  _startDateChangeHandler(selectedDates) {
    const startDate = selectedDates[0];
    const previousDate = new Date(this.getElement().querySelector(`#event-start-time-1`).dataset.date);
    const startDateMax = new Date(this.getElement().querySelector(`#event-end-time-1`).dataset.date);
    if (startDate > startDateMax) {
      this.getElement().querySelector(`#event-start-time-1`).value = setDateToForm(previousDate);
    } else {
      this.getElement().querySelector(`#event-start-time-1`).dataset.date = startDate;
      this._callback.changeStartDate(startDate);
    }
  }
  _finishDateChangeHandler(selectedDates) {
    const finishDate = selectedDates[0];
    const previousDate = new Date(this.getElement().querySelector(`#event-end-time-1`).dataset.date);
    const finishtDateMin = new Date(this.getElement().querySelector(`#event-start-time-1`).dataset.date);
    if (finishDate < finishtDateMin) {
      this.getElement().querySelector(`#event-end-time-1`).value = setDateToForm(previousDate);
    } else {
      this.getElement().querySelector(`#event-start-time-1`).dataset.date = finishDate;
      this._callback.changeFinishDate(finishDate);
    }
  }
  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(this._routePoint);
  }
  _resetHandler(evt) {
    evt.preventDefault();
    this._callback.resetClick();
  }
  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }
  _costChangeHandler(evt) {
    evt.preventDefault();
    this._callback.costChange(evt.target.dataset.type, evt.target.value);
  }
  _cityChangeHandler(evt) {
    evt.preventDefault();
    this._callback.cityChange(evt.target.dataset.type, evt.target.value);
  }
  _typeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.typeChange(evt.target.dataset.type, evt.target.value);
  }
  _offerChangeHandler(evt) {
    evt.preventDefault();
    this._callback.offerChange(evt.target, this._offers);
  }
  setSubmitHandler(callBack) {
    this._callback.submit = callBack;
    this.getElement().addEventListener(`submit`, this._submitHandler);
  }
  setResetHandler(callBack) {
    this._callback.resetClick = callBack;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._resetHandler);
  }
  setFavoriteClickHandler(callBack) {
    this._callback.favoriteClick = callBack;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
  setCostChangeHandler(callBack) {
    this._callback.costChange = callBack;
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._costChangeHandler);
  }
  setCityChangeHandler(callBack) {
    this._callback.cityChange = callBack;
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._cityChangeHandler);
  }
  setTypeChangeHandler(callBack) {
    this._callback.typeChange = callBack;
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
  }
  setOfferChangeHanler(callBack) {
    this._callback.offerChange = callBack;
    this.getElement().querySelector(`.event__available-offers`).addEventListener(`change`, this._offerChangeHandler);
  }
}
