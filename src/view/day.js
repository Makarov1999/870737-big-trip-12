import {prepareDateToDay, createElement} from "../util.js";
const createDayTemplate = (date, dayCounter) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${date.toISOString().slice(0, 11)}">${prepareDateToDay(date)}</time>
      </div>
     </li>`
  );
};

export default class DayView {
  constructor(date, dayCounter) {
    this._element = null;
    this._date = date;
    this._dayCounter = dayCounter;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._dayCounter);
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
