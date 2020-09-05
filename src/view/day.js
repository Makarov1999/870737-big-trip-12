import {prepareDateToDay} from "../utils/date.js";
import AbstractView from "./abstract.js";
const createDayTemplate = (date, dayCounter) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter ? dayCounter : ``}</span>
        <time class="day__date" datetime="${date ? date.toISOString().slice(0, 11) : ``}">${prepareDateToDay(date)}</time>
      </div>
     </li>`
  );
};

export default class DayView extends AbstractView {
  constructor(date, dayCounter) {
    super();
    this._date = date;
    this._dayCounter = dayCounter;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._dayCounter);
  }
}
