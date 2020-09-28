import {generateId} from "../mock/route-point.js";
import FormView from "../view/form.js";
import {remove, render} from "../utils/render.js";
import {ELEMENTS_POSITIONS, UserAction, UpdateType} from "../const.js";

export default class RoutePointNew {
  constructor(routePointContainer, changeData) {
    this._routePointContainer = routePointContainer;
    this._changeData = changeData;
    this._routePointFormComponent = null;
    this._handleSubmitHandler = this._handleSubmitHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }
  init(callBack) {
    this._destroyCallback = callBack;
    if (this._routePointFormComponent !== null) {
      return;
    }
    this._routePointFormComponent = new FormView();
    this._routePointFormComponent.setSubmitHandler(this._handleSubmitHandler);
    this._routePointFormComponent.setDeleteHandler(this._handleDeleteClick);
    render(this._routePointContainer, this._routePointFormComponent, ELEMENTS_POSITIONS.AFTERBEGIN);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }
  destroy() {
    if (this._routePointFormComponent === null) {
      return;
    }
    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }
    remove(this._routePointFormComponent);
    this._routePointFormComponent = null;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }
  _handleSubmitHandler(routePoint) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, routePoint)
    );
  }
  _handleDeleteClick() {
    this.destroy();
  }
  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
