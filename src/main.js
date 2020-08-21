import {createInfoAndCostTemplate} from "./view/info-cost.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createFiltersTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createFormMarksRouteTemplate} from "./view/form.js";
import {createRoutePointTemplate} from "./view/route-point.js";
import {createDayListTemplate} from "./view/day-list.js";
import {createDayTemplate} from "./view/day.js";
import {generateRoutePoints} from "./mock/route-point.js";
import {CITIES} from "./const.js";


const routePoints = generateRoutePoints(15);
const mainTripBlock = document.querySelector(`.trip-main`);
const mainTripFilterContainer = mainTripBlock.querySelector(`.trip-controls`);
const mainTripFirstCaption = mainTripFilterContainer.querySelector(`h2.visually-hidden`);
const eventsTripContainer = document.querySelector(`.trip-events`);
const eventsTripCapture = eventsTripContainer.querySelector(`h2.visually-hidden`);
const INSIDE_END_POS = `beforeend`;
const OUTSIDE_END_POS = `afterend`;
const OUTSIDE_BEGIN_POS = `afterbegin`;

const renderElement = (parent, template, position) => {
  parent.insertAdjacentHTML(position, template);
};


renderElement(mainTripBlock, createInfoAndCostTemplate(), OUTSIDE_BEGIN_POS);
renderElement(mainTripFirstCaption, createMainMenuTemplate(), OUTSIDE_END_POS);
renderElement(mainTripFilterContainer, createFiltersTemplate(), INSIDE_END_POS);
renderElement(eventsTripCapture, createSortTemplate(), OUTSIDE_END_POS);
renderElement(eventsTripContainer, createFormMarksRouteTemplate(CITIES), INSIDE_END_POS);
renderElement(eventsTripContainer, createDayListTemplate(), INSIDE_END_POS);
const daysList = eventsTripContainer.querySelector(`.trip-days`);
let currentDay = routePoints[0].startTime.getDate();
let daysIterator = 1;
let eventElements = ``;
let dayElement = ``;
for (let i = 0; i < routePoints.length; i++) {
  if (routePoints[i].startTime.getDate() !== currentDay || i === routePoints.length - 1) {
    dayElement = createDayTemplate(routePoints[i - 1].startTime, daysIterator, eventElements);
    daysIterator++;
    currentDay = routePoints[i].startTime.getDate();
    eventElements = ``;
    renderElement(daysList, dayElement, INSIDE_END_POS);
    dayElement = ``;
  }
  eventElements += createRoutePointTemplate(routePoints[i]);
}
