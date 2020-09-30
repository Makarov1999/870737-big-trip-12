import FilterView from "../view/filter.js";
import SortView from "../view/sort.js";
import DayListView from "../view/day-list.js";
import DayView from "../view/day.js";
import CaptionView from "../view/caption.js";
import RoutePointListView from "../view/route-point-list.js";
import NoRoutePointView from "../view/no-route-points.js";
import LoadingView from "../view/loading.js";
import ErrorView from "../view/error.js";
import {filter} from "../utils/filter.js";
import {ELEMENTS_POSITIONS, CAPTIONS_TEXT, SortType, UserAction, UpdateType, FILTERS, FilterType, State as RoutePointPresenterViewState} from "../const.js";
import {sortRoutePointsByPrice, sortRoutePointsByTime} from "../utils/sort.js";
import {render, remove} from "../utils/render.js";
import RoutePoint from "./route-point.js";
import RoutePointNew from "./route-point-new.js";
import Points from "../model/points.js";

export default class Trip {
  constructor(tripControlContainer, eventsTripContainer, points, filterModel, api) {
    this._points = points;
    this._filterModel = filterModel;
    this._api = api;
    this._tripControlContainer = tripControlContainer;
    this._eventsTripContainer = eventsTripContainer;
    this._isLoading = true;
    this._filterComponent = new FilterView(FILTERS, FilterType.EVERYTHING);
    this._loadingComponent = new LoadingView();
    this._errorComponent = new ErrorView();
    this._sortComponent = new SortView();
    this._noRoutePointComponent = new NoRoutePointView();
    this._dayList = new DayListView();
    this._currentSortType = SortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._routePointPresenter = {};
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(offers = [], destinations = []) {
    if (offers.length > 0 || destinations.length > 0) {
      this._offers = offers;
      this._destinations = destinations;
    }
    this._routePointNewPresenter = new RoutePointNew(this._eventsTripContainer, this._handleViewAction, this._offers, this._destinations);
    render(this._tripControlContainer, new CaptionView(CAPTIONS_TEXT.TRIP_VIEW), ELEMENTS_POSITIONS.AFTERBEGIN);
    render(this._tripControlContainer, new CaptionView(CAPTIONS_TEXT.FILTER), ELEMENTS_POSITIONS.BEFOREEND);
    render(this._eventsTripContainer, new CaptionView(CAPTIONS_TEXT.EVENT), ELEMENTS_POSITIONS.AFTERBEGIN);
    this._renderTrip();
    this._points.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }
  destroy() {
    this._clearTrip();
    this._points.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }
  createRoutePoint(callBack) {
    this._currentSortType = SortType.DEFAULT;
    this._routePointNewPresenter.init(callBack);
  }
  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._points.getPoints();
    const filteredPoints = filter[filterType](points);
    switch (this._currentSortType) {
      case SortType.PRICE:
        return filteredPoints.slice().sort(sortRoutePointsByPrice);
      case SortType.TIME:
        return filteredPoints.slice().sort(sortRoutePointsByTime);
    }
    return filteredPoints;
  }
  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._routePointPresenter[update.id].setViewState(RoutePointPresenterViewState.SAVING);
        this._api.updatePoint(update)
        .then((response) => {
          this._points.updatePoint(updateType, Points.adaptToClient(response));
        })
        .catch(() => {
          this._routePointPresenter[update.id].setViewState(RoutePointPresenterViewState.ABORTING);
        });
        break;
      case UserAction.ADD_POINT:
        this._routePointNewPresenter.setSaving();
        this._api.addPoint(update)
        .then((response) => {
          this._points.addPoint(updateType, response);
        })
        .catch(() => {
          this._routePointNewPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_POINT:
        this._routePointPresenter[update.id].setViewState(RoutePointPresenterViewState.DELETING);
        this._api.deletePoint(update)
        .then(() => {
          this._points.deletePoint(updateType, update);
        })
        .catch(() => {
          this._routePointPresenter[update.id].setViewState(RoutePointPresenterViewState.ABORTING);
        });
        break;
    }
  }
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._routePointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearRoutePoints();
        if (this._currentSortType === SortType.DEFAULT) {
          this._renderRoutePointsByDays(this._getPoints());
        } else {
          this._renderRoutePoints(this._getPoints());
        }
        break;
      case UpdateType.MAJOR:
        this._currentSortType = SortType.DEFAULT;
        this._sortComponent.getElement().querySelector(`.trip-sort__item--event .trip-sort__input`).checked = true;
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
      case UpdateType.ERROR:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderError();
        break;
    }
  }
  _handleModeChange() {
    this._routePointNewPresenter.destroy();
    Object.values(this._routePointPresenter)
    .forEach((presenter) => presenter.resetView());
  }
  _renderRoutePointsByDays(routePoints) {
    if (routePoints.length > 0) {
      let currentDay = routePoints[0].startTime;
      let daysIterator = 1;
      let dayElement = new DayView(currentDay, daysIterator).getElement();
      let eventList = new RoutePointListView();
      for (let i = 0; i < routePoints.length; i++) {
        if (routePoints[i].startTime.getDate() !== currentDay.getDate()) {
          daysIterator++;
          currentDay = routePoints[i].startTime;
          dayElement = new DayView(currentDay, daysIterator).getElement();
          eventList = new RoutePointListView();
        }
        render(dayElement, eventList, ELEMENTS_POSITIONS.BEFOREEND);
        render(this._dayList, dayElement, ELEMENTS_POSITIONS.BEFOREEND);
        this._renderRoutePoint(eventList, routePoints[i]);
      }
      render(this._eventsTripContainer, this._dayList, ELEMENTS_POSITIONS.BEFOREEND);
    }
  }
  _renderNoRoutePoints() {
    if (!this._noRoutePointComponent) {
      this._noRoutePointComponent = new NoRoutePointView();
    }
    render(this._eventsTripContainer, this._noRoutePointComponent, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _renderLoading() {
    render(this._eventsTripContainer, this._loadingComponent, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _renderError() {
    render(this._eventsTripContainer, this._errorComponent, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _renderRoutePoint(routePointList, routePoint) {
    const routePointPresenter = new RoutePoint(routePointList, this._handleViewAction, this._handleModeChange, routePoint, this._offers, this._destinations);
    routePointPresenter.init(routePoint);
    this._routePointPresenter[routePoint.id] = routePointPresenter;
  }
  _renderRoutePoints(routePoints) {
    const emptyDay = new DayView();
    const eventList = new RoutePointListView();
    routePoints.forEach((routePoint) => {
      this._renderRoutePoint(eventList, routePoint);
    });
    render(emptyDay, eventList, ELEMENTS_POSITIONS.BEFOREEND);
    render(this._dayList, emptyDay, ELEMENTS_POSITIONS.BEFOREEND);
    render(this._eventsTripContainer, this._dayList, ELEMENTS_POSITIONS.BEFOREEND);
  }
  _clearRoutePoints() {
    this._routePointNewPresenter.destroy();
    this._dayList.getElement().innerHTML = ``;
  }
  _clearTrip() {
    remove(this._sortComponent);
    remove(this._loadingComponent);
    remove(this._errorComponent);
    this._clearRoutePoints();
  }
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    const routePoints = this._getPoints();
    this._clearRoutePoints();
    render(this._eventsTripContainer, this._sortComponent, ELEMENTS_POSITIONS.BEFOREEND);
    if (this._currentSortType === SortType.DEFAULT) {
      this._sortComponent.getElement().querySelector(`.trip-sort__item--day`).style.color = ``;
      this._renderRoutePointsByDays(routePoints);
    } else {
      this._sortComponent.getElement().querySelector(`.trip-sort__item--day`).style.color = `#f2f2f2`;
      this._renderRoutePoints(routePoints);
    }
  }
  _renderSort() {
    render(this._eventsTripContainer, this._sortComponent, ELEMENTS_POSITIONS.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }
  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const routePoints = this._getPoints();
    if (routePoints.length > 0) {
      if (this._noRoutePointComponent) {
        remove(this._noRoutePointComponent);
      }
      this._renderSort();
      this._renderRoutePointsByDays(routePoints);

    } else {
      this._renderNoRoutePoints(routePoints);
    }
  }
}
