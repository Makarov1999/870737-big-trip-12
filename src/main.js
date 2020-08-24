import TripInfoView from "./view/trip-info.js";
import MainMenuView from "./view/main-menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import FormView from "./view/form.js";
import RoutePointView from "./view/route-point.js";
import DayListView from "./view/day-list.js";
import DayView from "./view/day.js";
import CaptionView from "./view/caption.js";
import RoutePointListView from "./view/route-point-list.js";

import {generateRoutePoints} from "./mock/route-point.js";
import {CITIES, ELEMENTS_POSITIONS, CAPTIONS_TEXT} from "./const.js";
import {render, countTripCost} from "./util.js";
const routePoints = generateRoutePoints(15);
const route = `Amsterdam &mdash; Geneva`;
const tripCost = countTripCost(routePoints);
const tripStart = routePoints[0].startTime;
const tripFinish = routePoints[routePoints.length - 1].finishTime;
const mainTripBlock = document.querySelector(`.trip-main`);
const mainTripFilterContainer = mainTripBlock.querySelector(`.trip-controls`);
const eventsTripContainer = document.querySelector(`.trip-events`);

render(mainTripBlock, new TripInfoView(route, tripCost, tripStart, tripFinish).getElement(), ELEMENTS_POSITIONS.AFTERBEGIN);
render(mainTripFilterContainer, new CaptionView(CAPTIONS_TEXT.TRIP_VIEW).getElement(), ELEMENTS_POSITIONS.AFTERBEGIN);
render(mainTripFilterContainer, new MainMenuView().getElement(), ELEMENTS_POSITIONS.BEFOREEND);
render(mainTripFilterContainer, new CaptionView(CAPTIONS_TEXT.FILTER).getElement(), ELEMENTS_POSITIONS.BEFOREEND);
render(mainTripFilterContainer, new FilterView().getElement(), ELEMENTS_POSITIONS.BEFOREEND);
render(eventsTripContainer, new CaptionView(CAPTIONS_TEXT.EVENT).getElement(), ELEMENTS_POSITIONS.AFTERBEGIN);
render(eventsTripContainer, new SortView().getElement(), ELEMENTS_POSITIONS.BEFOREEND);
const dayList = new DayListView();
render(eventsTripContainer, dayList.getElement(), ELEMENTS_POSITIONS.BEFOREEND);
const renderRoutePoint = (container, routePoint) => {
  const routePointComponent = new RoutePointView(routePoint);
  const routePointFormComponent = new FormView(CITIES, routePoint);
  const replaceRoutePointToForm = () => {
    container.replaceChild(routePointFormComponent.getElement(), routePointComponent.getElement());
  };
  const replaceFormToRoutePoint = () => {
    container.replaceChild(routePointComponent.getElement(), routePointFormComponent.getElement());
  };
  render(container, routePointComponent.getElement(), ELEMENTS_POSITIONS.BEFOREEND);
  routePointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, replaceRoutePointToForm);
  routePointFormComponent.getElement().addEventListener(`submit`, replaceFormToRoutePoint);

};
const renderRoutePointsByDays = (daysContainer, events) => {
  if (events.length > 0) {
    let currentDay = events[0].startTime.getDate();
    let daysIterator = 1;
    let eventList = new RoutePointListView().getElement();
    for (let i = 0; i < routePoints.length; i++) {
      if (routePoints[i].startTime.getDate() !== currentDay || i === events.length - 1) {
        let dayElement = new DayView(events[i - 1].startTime, daysIterator).getElement();
        render(dayElement, eventList, ELEMENTS_POSITIONS.BEFOREEND);
        render(daysContainer, dayElement, ELEMENTS_POSITIONS.BEFOREEND);
        daysIterator++;
        currentDay = events[i].startTime.getDate();
        eventList = new RoutePointListView().getElement();
      }
      renderRoutePoint(eventList, events[i]);
    }
  }
};
const daysList = eventsTripContainer.querySelector(`.trip-days`);
renderRoutePointsByDays(daysList, routePoints);
