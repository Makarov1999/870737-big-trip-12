import FormView from "../view/form.js";
import RoutePointView from "../view/route-point.js";
import {render, replace, remove} from "../utils/render.js";
import {CITIES, ELEMENTS_POSITIONS} from "../const.js";

export default class RoutePoint {
  constructor(routePointContainer, changeData) {
    this._routePointContainer = routePointContainer;
    this._changeData = changeData;
    this._routePointComponent = null;
    this._routePointFormComponent = null;
    this._handleClickHandler = this._handleClickHandler.bind(this);
    this._handleSubmitHandler = this._handleSubmitHandler.bind(this);
    this._handleFavoriteHandler = this._handleFavoriteHandler.bind(this);
  }
  init(routePoint) {
    this._routePoint = routePoint;
    this._prevRoutePointComponent = this._routePointComponent;
    this._prevRoutePointFormComponent = this._routePointFormComponent;
    this._routePointComponent = new RoutePointView(routePoint);
    this._routePointFormComponent = new FormView(CITIES, routePoint);
    this._routePointComponent.setClickHandler(this._handleClickHandler);
    this._routePointFormComponent.setSubmitHandler(this._handleSubmitHandler);
    this._routePointFormComponent.setFavoriteClickHandler(this._handleFavoriteHandler);
    if (this._prevRoutePointComponent === null || this._prevRoutePointFormComponent === null) {
      render(this._routePointContainer, this._routePointComponent, ELEMENTS_POSITIONS.BEFOREEND);
      return;
    }
    if (this._routePointContainer.getElement().contains(this._prevRoutePointComponent.getElement())) {
      replace(this._routePointComponent, this._prevRoutePointComponent);
    }
    console.log(this._prevRoutePointFormComponent.getElement());
    console.log(this._routePointContainer.getElement());
    if (this._routePointContainer.getElement().contains(this.prevRoutePointFormComponent.getElement())) {
      replace(this._routePointFormComponent, this._prevRoutePointFormComponent);
    }
    remove(this._prevRoutePointComponent);
    remove(this._prevRoutePointFormComponent);
  }
  destroy() {
    remove(this._routePointComponent);
    remove(this._routePointFormComponent);
  }

  _replaceRoutePointToForm() {
    replace(this._routePointFormComponent, this._routePointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }
  _replaceFormToRoutePoint() {
    replace(this._routePointComponent, this._routePointFormComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }
  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToRoutePoint();
    }
  }
  _handleClickHandler() {
    this._replaceRoutePointToForm();
  }
  _handleSubmitHandler(routePoint) {
    this._changeData(routePoint);
    this._replaceFormToRoutePoint();
  }
  _handleFavoriteHandler() {
    this._changeData(
        Object.assign(
            {},
            this._routePoint,
            {
              isFavorite: !this._routePoint.isFavorite
            }
        )
    );
  }
}
