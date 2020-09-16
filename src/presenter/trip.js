import TripInfoView from "../view/trip-info.js";
import MainMenuView from "../view/main-menu.js";
import FilterView from "../view/filter.js";
import SortView from "../view/sort.js";
import DayListView from "../view/day-list.js";
import DayView from "../view/day.js";
import CaptionView from "../view/caption.js";
import RoutePointListView from "../view/route-point-list.js";
import NoRoutePointView from "../view/no-route-points.js";
import {ELEMENTS_POSITIONS, CAPTIONS_TEXT, SortType} from "../const.js";
import {countTripCost, countRoute, updateItem} from "../utils/common.js";
import {sortRoutePointsByPrice, sortRoutePointsByTime} from "../utils/sort.js";
import {render} from "../utils/render.js";
import RoutePoint from "./route-point.js";

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
    this._currentSortType = SortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._routePointPresenter = {};
    this._handleRoutePointChange = this._handleRoutePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(routePoints) {
    this._routePoints = routePoints.slice();
    this._sourceRoutePoints = routePoints.slice();
    this._renderTripInfo();
    render(this._tripControlContainer, new CaptionView(CAPTIONS_TEXT.TRIP_VIEW), ELEMENTS_POSITIONS.AFTERBEGIN);
    this._renderMainMenu();
    render(this._tripControlContainer, new CaptionView(CAPTIONS_TEXT.FILTER), ELEMENTS_POSITIONS.BEFOREEND);
    this._renderFilter();
    render(this._eventsTripContainer, new CaptionView(CAPTIONS_TEXT.EVENT), ELEMENTS_POSITIONS.AFTERBEGIN);
    this._renderTrip();
  }
  _handleRoutePointChange(updatedRoutePoint) {
    this._routePoints = updateItem(this._routePoints, updatedRoutePoint);
    this._sourceRoutePoints = updateItem(this._sourceRoutePoints, updatedRoutePoint);
    this._routePointPresenter[updatedRoutePoint.id].init(updatedRoutePoint);
  }
  _handleModeChange() {
    Object.values(this._routePointPresenter)
    .forEach((presenter) => presenter.resetView());
  }
  _renderRoutePointsByDays() {
    if (this._routePoints.length > 0) {
      let currentDay = this._routePoints[0].startTime;
      let daysIterator = 1;
      let dayElement = new DayView(currentDay, daysIterator).getElement();
      let eventList = new RoutePointListView();
      for (let i = 0; i < this._routePoints.length; i++) {
        if (this._routePoints[i].startTime.getDate() !== currentDay.getDate()) {
          daysIterator++;
          currentDay = this._routePoints[i].startTime;
          dayElement = new DayView(currentDay, daysIterator).getElement();
          eventList = new RoutePointListView();
        }
        render(dayElement, eventList, ELEMENTS_POSITIONS.BEFOREEND);
        render(this._dayList, dayElement, ELEMENTS_POSITIONS.BEFOREEND);
        this._renderRoutePoint(eventList, this._routePoints[i]);
      }
      render(this._eventsTripContainer, this._dayList, ELEMENTS_POSITIONS.BEFOREEND);
    }
  }
  _renderNoRoutePoints() {
    render(this._eventsTripContainer, this._noRoutePointComponent, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _renderRoutePoints() {
    const emptyDay = new DayView();
    const eventList = new RoutePointListView();
    this._routePoints.forEach((routePoint) => {
      this._renderRoutePoint(eventList, routePoint);
    });
    render(emptyDay, eventList, ELEMENTS_POSITIONS.BEFOREEND);
    render(this._dayList, emptyDay, ELEMENTS_POSITIONS.BEFOREEND);
    render(this._eventsTripContainer, this._dayList, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _renderFilter() {
    render(this._tripControlContainer, this._filterComponent, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _renderRoutePoint(routePointList, routePoint) {
    const routePointPresenter = new RoutePoint(routePointList, this._handleRoutePointChange, this._handleModeChange);
    routePointPresenter.init(routePoint);
    this._routePointPresenter[routePoint.id] = routePointPresenter;

  }
  _clearRoutePoints() {
    this._dayList.getElement().innerHTML = ``;
  }
  _sortRoutePoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._routePoints.sort(sortRoutePointsByTime);
        break;
      case SortType.PRICE:
        this._routePoints.sort(sortRoutePointsByPrice);
        break;
      default:
        this._routePoints = this._sourceRoutePoints.slice();
    }
    this._currentSortType = sortType;
  }
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortRoutePoints(sortType);
    this._clearRoutePoints();
    render(this._eventsTripContainer, this._sortComponent, ELEMENTS_POSITIONS.BEFOREEND);
    if (this._currentSortType === SortType.DEFAULT) {
      this._renderRoutePointsByDays();
    } else {
      this._renderRoutePoints();
    }
  }
  _renderSort() {
    render(this._eventsTripContainer, this._sortComponent, ELEMENTS_POSITIONS.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

    } else {
      this._renderNoRoutePoints();
    }
  }
}
