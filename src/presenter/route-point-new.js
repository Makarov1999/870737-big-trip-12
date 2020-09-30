import FormView from "../view/form.js";
import {remove, render} from "../utils/render.js";
import {ELEMENTS_POSITIONS, UserAction, UpdateType} from "../const.js";

export default class RoutePointNew {
  constructor(routePointContainer, changeData, offers, destinations) {
    this._offers = offers;
    this._destinations = destinations;
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
    this._routePointFormComponent = new FormView(this._offers, this._destinations);
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
  setSaving() {
    this._routePointFormComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }
  setAborting() {
    const resetFormState = () => {
      this._routePointFormComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._routePointFormComponent.shake(resetFormState);
  }
  _handleSubmitHandler(routePoint) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        routePoint
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
