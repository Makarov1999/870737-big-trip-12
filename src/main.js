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
import NoRoutePointView from "./view/no-route-points.js";
import {generateRoutePoints} from "./mock/route-point.js";
import {CITIES, ELEMENTS_POSITIONS, CAPTIONS_TEXT} from "./const.js";
import {render, countTripCost} from "./util.js";

const routePoints = generateRoutePoints(15);
const route = `Amsterdam &mdash; Geneva`;
const tripCost = countTripCost(routePoints) ? countTripCost(routePoints) : 0;
const tripStart = routePoints[0] ? routePoints[0].startTime : new Date();
const tripFinish = routePoints[routePoints.length - 1] ? routePoints[routePoints.length - 1].finishTime : new Date();
const mainTripBlock = document.querySelector(`.trip-main`);
const mainTripFilterContainer = mainTripBlock.querySelector(`.trip-controls`);
const eventsTripContainer = document.querySelector(`.trip-events`);

render(mainTripBlock, new TripInfoView(route, tripCost, tripStart, tripFinish).getElement(), ELEMENTS_POSITIONS.AFTERBEGIN);
render(mainTripFilterContainer, new CaptionView(CAPTIONS_TEXT.TRIP_VIEW).getElement(), ELEMENTS_POSITIONS.AFTERBEGIN);
render(mainTripFilterContainer, new MainMenuView().getElement(), ELEMENTS_POSITIONS.BEFOREEND);
render(mainTripFilterContainer, new CaptionView(CAPTIONS_TEXT.FILTER).getElement(), ELEMENTS_POSITIONS.BEFOREEND);
render(mainTripFilterContainer, new FilterView().getElement(), ELEMENTS_POSITIONS.BEFOREEND);
render(eventsTripContainer, new CaptionView(CAPTIONS_TEXT.EVENT).getElement(), ELEMENTS_POSITIONS.AFTERBEGIN);

const renderRoutePoint = (container, routePoint) => {
  const routePointComponent = new RoutePointView(routePoint);
  const routePointFormComponent = new FormView(CITIES, routePoint);
  const onFormEscPress = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToRoutePoint();
    }
  };
  const replaceRoutePointToForm = () => {
    container.replaceChild(routePointFormComponent.getElement(), routePointComponent.getElement());
    document.addEventListener(`keydown`, onFormEscPress);
  };
  const replaceFormToRoutePoint = () => {
    container.replaceChild(routePointComponent.getElement(), routePointFormComponent.getElement());
    document.removeEventListener(`keydown`, onFormEscPress);
  };
  render(container, routePointComponent.getElement(), ELEMENTS_POSITIONS.BEFOREEND);
  routePointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, replaceRoutePointToForm);
  routePointFormComponent.getElement().addEventListener(`submit`, replaceFormToRoutePoint);

};
const renderRoutePointsByDays = (daysContainer, events) => {
  if (events.length > 0) {
    let currentDay = events[0].startTime;
    let daysIterator = 1;
    let dayElement = new DayView(currentDay, daysIterator).getElement();
    let eventList = new RoutePointListView().getElement();
    for (let i = 0; i < routePoints.length; i++) {
      if (routePoints[i].startTime.getDate() !== currentDay.getDate()) {
        daysIterator++;
        currentDay = events[i].startTime;
        dayElement = new DayView(currentDay, daysIterator).getElement();
        eventList = new RoutePointListView().getElement();
      }
      render(dayElement, eventList, ELEMENTS_POSITIONS.BEFOREEND);
      render(daysContainer, dayElement, ELEMENTS_POSITIONS.BEFOREEND);
      renderRoutePoint(eventList, events[i]);
    }
  }
};

if (routePoints.length > 0) {
  render(eventsTripContainer, new SortView().getElement(), ELEMENTS_POSITIONS.BEFOREEND);
  const daysList = new DayListView().getElement();
  renderRoutePointsByDays(daysList, routePoints);
  render(eventsTripContainer, daysList, ELEMENTS_POSITIONS.BEFOREEND);
} else {
  render(eventsTripContainer, new NoRoutePointView().getElement(), ELEMENTS_POSITIONS.BEFOREEND);
}
