import TripInfoView from "../view/trip-info.js";
import MainMenuView from "../view/main-menu.js";
import FilterView from "../view/filter.js";
import SortView from "../view/sort.js";
import FormView from "../view/form.js";
import RoutePointView from "../view/route-point.js";
import DayListView from "../view/day-list.js";
import DayView from "../view/day.js";
import CaptionView from "../view/caption.js";
import RoutePointListView from "../view/route-point-list.js";
import NoRoutePointView from "../view/no-route-points.js";
import {CITIES, ELEMENTS_POSITIONS, CAPTIONS_TEXT} from "../const.js";
import {countTripCost, countRoute} from "../utils/common.js";
import {render, replace} from "../utils/render.js";

export default class {
  constructor(tripMainContainer, tripControlContainer, eventsTripContainer) {
    this._tripMainContainer = tripMainContainer;
    this._tripControlContainer = tripControlContainer;
    this._eventsTripContainer = eventsTripContainer;
    this._mainMenuComponent = new MainMenuView();
    this._filterComponent = new FilterView();
    this._sortComponent = new SortView();
    this._noRoutePointComponent = new NoRoutePointView();
    this._dayList = new DayListView();
  }

  init(routePoints) {
    this._routePoints = routePoints.slice();
    this._renderTripInfo();
    render(this._tripControlContainer, new CaptionView(CAPTIONS_TEXT.TRIP_VIEW), ELEMENTS_POSITIONS.AFTERBEGIN);
    this._renderMainMenu();
    render(this._tripControlContainer, new CaptionView(CAPTIONS_TEXT.FILTER), ELEMENTS_POSITIONS.BEFOREEND);
    this._renderFilter();
    render(this._eventsTripContainer, new CaptionView(CAPTIONS_TEXT.EVENT), ELEMENTS_POSITIONS.AFTERBEGIN);
    this._renderTrip();
  }
  _renderRoutePoint(container, routePoint) {
    const routePointComponent = new RoutePointView(routePoint);
    const routePointFormComponent = new FormView(CITIES, routePoint);
    const onFormEscPress = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToRoutePoint();
      }
    };
    const replaceRoutePointToForm = () => {
      replace(routePointFormComponent, routePointComponent);
      document.addEventListener(`keydown`, onFormEscPress);
    };
    const replaceFormToRoutePoint = () => {
      replace(routePointComponent, routePointFormComponent);
      document.removeEventListener(`keydown`, onFormEscPress);
    };
    render(container, routePointComponent.getElement(), ELEMENTS_POSITIONS.BEFOREEND);
    routePointComponent.setClickHandler(replaceRoutePointToForm);
    routePointFormComponent.setSubmitHandler(replaceFormToRoutePoint);

  }
  _renderRoutePointsByDays() {
    if (this._routePoints.length > 0) {
      let currentDay = this._routePoints[0].startTime;
      let daysIterator = 1;
      let dayElement = new DayView(currentDay, daysIterator).getElement();
      let eventList = new RoutePointListView().getElement();
      for (let i = 0; i < this._routePoints.length; i++) {
        if (this._routePoints[i].startTime.getDate() !== currentDay.getDate()) {
          daysIterator++;
          currentDay = this._routePoints[i].startTime;
          dayElement = new DayView(currentDay, daysIterator).getElement();
          eventList = new RoutePointListView().getElement();
        }
        render(dayElement, eventList, ELEMENTS_POSITIONS.BEFOREEND);
        render(this._dayList, dayElement, ELEMENTS_POSITIONS.BEFOREEND);
        this._renderRoutePoint(eventList, this._routePoints[i]);
      }
    }

  }
  _renderNoRoutePoints() {
    render(this._eventsTripContainer, this._noRoutePointComponent, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _renderRoutePoints() {

  }
  _renderFilter() {
    render(this._tripControlContainer, this._filterComponent, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _renderSort() {
    render(this._eventsTripContainer, this._sortComponent, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _renderMainMenu() {
    render(this._tripControlContainer, this._mainMenuComponent, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _renderTripInfo() {
    const route = this._routePoints.length > 0 ? countRoute(this._routePoints) : ``;
    const tripCost = countTripCost(this._routePoints) ? countTripCost(this._routePoints) : 0;
    const tripStart = this._routePoints[0] ? this._routePoints[0].startTime : ``;
    const tripFinish = this._routePoints[this._routePoints.length - 1] ? this._routePoints[this._routePoints.length - 1].finishTime : ``;
    this._tripInfoComponent = new TripInfoView(route, tripCost, tripStart, tripFinish);
    render(this._tripMainContainer, this._tripInfoComponent, ELEMENTS_POSITIONS.AFTERBEGIN);
  }
  _renderTrip() {
    if (this._routePoints.length > 0) {
      this._renderSort();
      this._renderRoutePointsByDays();
      render(this._eventsTripContainer, this._dayList, ELEMENTS_POSITIONS.BEFOREEND);
    } else {
      this._renderNoRoutePoints();
    }
  }
}
