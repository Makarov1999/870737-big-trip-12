import {ROUTE_POINT_TYPES_FORM, ROUTE_POINT_TYPES, ROUTE_POINT_GROUPS} from "../const.js";
import {createElement} from "../utils/common.js";
import {setDateToForm} from "../utils/date.js";
import Smart from "./smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import {isOfferChecked, getOffersByType} from "../utils/offer.js";
import {getCities, getDestination} from "../utils/destination.js";

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
    photosFormTemplate += `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
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
const createDetailsSectionTemplate = (allOffers, offers, destination, type, isDisabled) => {
  if (!getOffersByType(allOffers, type) > 0 && !destination.description) {
    return ``;
  } else {
    return (
      `<section class="event__details">
        ${getOffersByType(allOffers, type) ? createOffersSection(getOffersByType(allOffers, type).offers, offers, isDisabled) : ``}
        ${destination.description ? createDestinationSection(destination) : ``}
       <section>`
    );
  }
};
const createDestinationSection = (destination) => {
  return (
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    ${destination.pictures ? `<div class="event__photos-container"><div class="event__photos-tape">${createPhotosFormTemplate(destination.pictures)}</div></div>` : ``}
    </section>`
  );
};
const createOfferFormTemplate = (offer, isChecked, isDisabled) => {
  return (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" value="${offer.title}" id="event-offer-${offer.title.toLowerCase()}-1" type="checkbox" data-price="${offer.price}" name="event-offer-${offer.title.toLowerCase()}" ${isChecked ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase()}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
  );
};

const createOffersSection = (offers, checkedOffers, isDisabled) => {
  let offersTemplate = ``;
  offers.forEach((offer) => {
    if (isOfferChecked(checkedOffers, offer)) {
      offersTemplate += createOfferFormTemplate(offer, true, isDisabled);
    } else {
      offersTemplate += createOfferFormTemplate(offer, false, isDisabled);
    }
  });
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offersTemplate}
      </div>
    </section>`
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

export const createFormMarksRouteTemplate = (data, offersAll, destinations) => {
  const OFFERS = offersAll;
  const DESTINATIONS = destinations;
  if (data) {
    const {type, destination, startTime, finishTime, cost, isFavorite, offers, isDisabled, isDeleting, isSaving} = data;
    let deletingButtonValue = ``;
    if (!data.id) {
      deletingButtonValue = `Cancel`;
    } else if (isDeleting) {
      deletingButtonValue = `Deleting`;
    } else {
      deletingButtonValue = `Delete`;
    }
    const prepos = (type === `Check-in` || type === `Restaurant` || type === `Sightseeing`) ? `in` : `to`;
    return (
      `<form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? `disabled` : ``}>

            <div class="event__type-list">
              ${createGroupsOfEventsFormTypeTemlate(ROUTE_POINT_GROUPS, type)}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type.substring(0, 1).toUpperCase() + type.substring(1)} ${prepos}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" data-type="city" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" ${isDisabled ? `disabled` : ``}>
            <datalist id="destination-list-1">
              ${createCitiesFormItems(getCities(DESTINATIONS))}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${setDateToForm(startTime)}" data-date="${startTime}" ${isDisabled ? `disabled` : ``}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${setDateToForm(finishTime)}" data-date="${finishTime}" ${isDisabled ? `disabled` : ``}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" data-type="cost" type="text" name="event-price" value="${cost}" ${isDisabled ? `disabled` : ``}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? `Saving` : `Save`}</button>
          <button class="event__reset-btn" type="reset">${deletingButtonValue}</button>
          ${data.id ? `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>` : ``}

          ${data.id ? `<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>` : ``}
        </header>

        ${createDetailsSectionTemplate(OFFERS, offers, destination, type, isDisabled)}
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
            ${createCitiesFormItems(getCities(DESTINATIONS))}
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
export default class FormView extends Smart {
  constructor(offers, destinations, routePoint) {
    super();
    if (!routePoint) {
      this._routePoint = {
        type: ROUTE_POINT_TYPES[0],
        destination: destinations[0],
        offers: [],
        startTime: new Date(),
        finishTime: new Date(),
        cost: 0,
        isFavorite: false
      };
    } else {
      this._routePoint = routePoint;
    }
    this._data = FormView.parsePointToData(this._routePoint);
    this._offers = offers;
    this._destinations = destinations;
    this._datepickerStart = null;
    this._datepickerFinish = null;
    this._submitHandler = this._submitHandler.bind(this);
    this._deleteHandler = this._deleteHandler.bind(this);
    this._resetHandler = this._resetHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._finishDateChangeHandler = this._finishDateChangeHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._costChangeHandler = this._costChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this.restoreHandlers = this.restoreHandlers.bind(this);
    this._setInnerHandlers();
    this._setDatePickerStart();
    this._setDatePickerFinish();
  }

  getTemplate() {
    return createFormMarksRouteTemplate(this._data, this._offers, this._destinations);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  _setInnerHandlers() {
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._costChangeHandler);
    if (this.getElement().querySelector(`.event__available-offers`)) {
      this.getElement().querySelector(`.event__available-offers`).addEventListener(`change`, this._offerChangeHandler);
    }
  }
  static parsePointToData(routePoint) {
    return Object.assign(
        {},
        routePoint,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }
  static parseDataToPoint(data) {
    Object.assign({}, data);
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
    return data;
  }
  restoreHandlers() {
    this.setSubmitHandler(this._callback.submit);
    this.setDeleteHandler(this._callback.deleteClick);
    if (this._data.id) {
      this.setResetHandler(this._callback.resetClick);
    }
    this._setDatePickerStart();
    this._setDatePickerFinish();
    this._setInnerHandlers();
  }
  reset(routePoint) {
    this.updateData(
        FormView.parsePointToData(routePoint)
    );
  }
  _setDatePickerStart() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.startTime,
          onChange: this._startDateChangeHandler,
          enableTime: true,
        }
    );
  }
  _setDatePickerFinish() {
    if (this._datepickerFinish) {
      this._datepickerFinish.destroy();
      this._datepickerFinish = null;
    }
    this._datepickerFinish = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.finishTime,
          onChange: this._finishDateChangeHandler,
          enableTime: true,
        }
    );
  }
  _startDateChangeHandler(selectedDates) {
    const startDate = selectedDates[0];
    if (startDate > this._data.finishTime) {
      this.getElement().querySelector(`.event__save-btn`).disabled = true;
    } else {
      this.getElement().querySelector(`.event__save-btn`).disabled = false;
      this.updateData({
        startTime: startDate
      });
    }
  }
  _finishDateChangeHandler(selectedDates) {
    const finishDate = selectedDates[0];
    if (finishDate < this._data.startTime) {
      this.getElement().querySelector(`.event__save-btn`).disabled = true;
    } else {
      this.getElement().querySelector(`.event__save-btn`).disabled = false;
      this.updateData({
        finishTime: finishDate
      });
    }
  }
  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(FormView.parseDataToPoint(this._data));
  }
  _deleteHandler(evt) {
    evt.preventDefault();
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._datepickerFinish) {
      this._datepickerFinish.destroy();
      this._datepickerFinish = null;
    }
    this._callback.deleteClick();
  }
  _resetHandler() {
    this._callback.resetClick();
  }
  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }
  _costChangeHandler(evt) {
    evt.preventDefault();
    if (isNaN(Number(evt.target.value))) {
      evt.target.setCustomValidity(`You should to input number`);
    } else {
      this.updateData({
        cost: Number(evt.target.value)
      });
    }
  }
  _destinationChangeHandler(evt) {
    evt.preventDefault();
    if (!getCities(this._destinations).includes(evt.target.value)) {
      evt.target.setCustomValidity(`Destination was not searched`);
    } else {
      evt.target.setCustomValidity(``);
      this.updateData({
        destination: Object.assign({}, this._routePoint.destination, {name: evt.target.value, description: getDestination(this._destinations, evt.target.value).description, pictures: getDestination(this._destinations, evt.target.value).pictures})
      });
    }
  }
  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });
  }
  _offerChangeHandler(evt) {
    if (evt.target.checked) {
      const offers = this._data.offers.slice();
      offers.push({title: evt.target.value, price: Number(evt.target.dataset.price)});
      this.updateData({offers});
    } else {
      const offers = this._data.offers.filter((offer) => offer.title !== evt.target.value);
      this.updateData({offers});
    }
  }
  setSubmitHandler(callBack) {
    this._callback.submit = callBack;
    this.getElement().addEventListener(`submit`, this._submitHandler);
  }
  setDeleteHandler(callBack) {
    this._callback.deleteClick = callBack;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteHandler);

  }
  setResetHandler(callBack) {
    this._callback.resetClick = callBack;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._resetHandler);
  }
  setFavoriteClickHandler(callBack) {
    this._callback.favoriteClick = callBack;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
