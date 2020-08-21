import {prepareDateToDay} from "../util.js";
export const createDayTemplate = (date, dayCounter, events) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${date.toISOString().slice(0, 11)}">${prepareDateToDay(date)}</time>
      </div>
      <ul class="trip-events__list">${events}<ul>
     </li>`
  );
};
