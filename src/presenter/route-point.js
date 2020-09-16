import FormView from "../view/form.js";
import RoutePointView from "../view/route-point.js";
import {render, replace, remove} from "../utils/render.js";
import {CITIES, ELEMENTS_POSITIONS} from "../const.js";
import {updateOffers} from "../utils/common.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class RoutePoint {
  constructor(routePointContainer, changeData, changeMode) {
    this._routePointContainer = routePointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._routePointComponent = null;
    this._routePointFormComponent = null;
    this._mode = Mode.DEFAULT;
    this._handleClickHandler = this._handleClickHandler.bind(this);
    this._handleSubmitHandler = this._handleSubmitHandler.bind(this);
    this._handleResetHandler = this._handleResetHandler.bind(this);
    this._handleFavoriteHandler = this._handleFavoriteHandler.bind(this);
    this._handleFormEdit = this._handleFormEdit.bind(this);
    this._handleFormOffers = this._handleFormOffers.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    // this.resetView = this.resetView.bind(this);
  }
  init(routePoint) {
    this._routePoint = routePoint;
    this._prevRoutePointComponent = this._routePointComponent;
    this._prevRoutePointFormComponent = this._routePointFormComponent;
    this._routePointComponent = new RoutePointView(routePoint);
    this._routePointFormComponent = new FormView(CITIES, routePoint);
    this._routePointComponent.setClickHandler(this._handleClickHandler);
    this._routePointFormComponent.setSubmitHandler(this._handleSubmitHandler);
    this._routePointFormComponent.setResetHandler(this._handleResetHandler);
    this._routePointFormComponent.setFavoriteClickHandler(this._handleFavoriteHandler);
    this._routePointFormComponent.setCostChangeHandler(this._handleFormEdit);
    this._routePointFormComponent.setCityChangeHandler(this._handleFormEdit);
    this._routePointFormComponent.setTypeChangeHandler(this._handleFormEdit);
    this._routePointFormComponent.setOfferChangeHanler(this._handleFormOffers);
    if (this._prevRoutePointComponent === null || this._prevRoutePointFormComponent === null) {
      render(this._routePointContainer, this._routePointComponent, ELEMENTS_POSITIONS.BEFOREEND);
      return;
    }
    if (this._mode === Mode.DEFAULT) {
      replace(this._routePointComponent, this._prevRoutePointComponent);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._routePointFormComponent, this._prevRoutePointFormComponent);
    }
    remove(this._prevRoutePointComponent);
    remove(this._prevRoutePointFormComponent);
  }
  destroy() {
    remove(this._routePointComponent);
    remove(this._routePointFormComponent);
  }
  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToRoutePoint();
    }
  }

  _replaceRoutePointToForm() {
    replace(this._routePointFormComponent, this._routePointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }
  _replaceFormToRoutePoint() {
    replace(this._routePointComponent, this._routePointFormComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
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
  _handleSubmitHandler() {
    this._changeData(this._routePoint);
    this._replaceFormToRoutePoint();
  }
  _handleResetHandler() {
    this._replaceFormToRoutePoint();
  }
  _handleFavoriteHandler() {
    this._routePoint = Object.assign(
        {},
        this._routePoint,
        {
          isFavorite: !this._routePoint.isFavorite
        }
    );
  }
  _handleFormEdit(name, value) {
    if (name === `type`) {
      this._routePointFormComponent.getElement().querySelector(`.event__type-icon`).src = `img/icons/${value.toLowerCase()}.png`;
      value = value.substring(0, 1).toUpperCase() + value.substring(1);
    }
    this._routePoint = Object.assign(
        {},
        this._routePoint,
        {[name]: value}
    );
  }
  _handleFormOffers(changedOffer, offers) {
    this._routePoint = Object.assign(
        {},
        this._routePoint,
        {
          offers: updateOffers(changedOffer, offers)
        }
    );
  }
}
