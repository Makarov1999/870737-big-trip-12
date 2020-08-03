import {createInfoAndCostTemplate} from "./view/info-cost.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createFiltersTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createFormMarksRouteTemplate} from "./view/form.js";
import {createRoutePointTemplate} from "./view/route-point.js";
import {createDayListTemplate} from "./view/day-list.js";
import {createDayTemplate} from "./view/day.js";
import {createEventListTemplate} from "./view/event-list";

const EVENTS_COUNT = 3;
const mainTripBlock = document.querySelector(`.trip-main`);
const mainTripFilterContainer = mainTripBlock.querySelector(`.trip-controls`);
const mainTripFirstCaption = mainTripFilterContainer.querySelector(`h2.visually-hidden`);
const eventsTripContainer = document.querySelector(`.trip-events`);
const eventsTripCapture = eventsTripContainer.querySelector(`h2.visually-hidden`);
const INSIDE_END_POS = `beforeend`;
const OUTSIDE_END_POS = `afterend`;
const OUTSIDE_BEGIN_POS = `afterbegin`;
let eventsResultTemplate = ``;

const renderElement = (parent, template, position) => {
  parent.insertAdjacentHTML(position, template);
};


renderElement(mainTripBlock, createInfoAndCostTemplate(), OUTSIDE_BEGIN_POS);
renderElement(mainTripFirstCaption, createMainMenuTemplate(), OUTSIDE_END_POS);
renderElement(mainTripFilterContainer, createFiltersTemplate(), INSIDE_END_POS);
renderElement(eventsTripCapture, createSortTemplate(), OUTSIDE_END_POS);
renderElement(eventsTripContainer, createFormMarksRouteTemplate(), INSIDE_END_POS);
renderElement(eventsTripContainer, createDayListTemplate(), INSIDE_END_POS);
const daysList = eventsTripContainer.querySelector(`.trip-days`);
renderElement(daysList, createDayTemplate(), INSIDE_END_POS);
const dayEvents = daysList.querySelector(`.day`);
renderElement(dayEvents, createEventListTemplate(), INSIDE_END_POS);
const eventsList = dayEvents.querySelector(`.trip-events__list`);
for (let i = 0; i < EVENTS_COUNT; i++) {
  eventsResultTemplate += createRoutePointTemplate();
}

renderElement(eventsList, eventsResultTemplate, INSIDE_END_POS);
