import FormView from "../view/form.js";
import RoutePointView from "../view/route-point.js";
import {render, replace, remove} from "../utils/render.js";
import {ELEMENTS_POSITIONS, UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class RoutePoint {
  constructor(routePointContainer, changeData, changeMode, routePoint) {
    this._originalOffers = routePoint.offers.slice();
    this._routePointContainer = routePointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._routePointComponent = null;
    this._routePointFormComponent = null;
    this._currentUpdateType = UpdateType.PATCH;
    this._mode = Mode.DEFAULT;
    this._handleClickHandler = this._handleClickHandler.bind(this);
    this._handleSubmitHandler = this._handleSubmitHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleResetHandler = this._handleResetHandler.bind(this);
    this._handleFavoriteHandler = this._handleFavoriteHandler.bind(this);
    this._handleFormOffers = this._handleFormOffers.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }
  init(routePoint) {
    this._routePoint = routePoint;
    this._prevRoutePointComponent = this._routePointComponent;
    this._prevRoutePointFormComponent = this._routePointFormComponent;
    this._routePointComponent = new RoutePointView(routePoint);
    this._routePointFormComponent = new FormView(routePoint);
    this._routePointComponent.setClickHandler(this._handleClickHandler);
    this._routePointFormComponent.setSubmitHandler(this._handleSubmitHandler);
    this._routePointFormComponent.setResetHandler(this._handleResetHandler);
    this._routePointFormComponent.setDeleteHandler(this._handleDeleteClick);
    this._routePointFormComponent.setFavoriteClickHandler(this._handleFavoriteHandler);
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
      this._routePointFormComponent.reset(this._routePoint);
      this._changeData(
          UserAction.UPDATE_POINT,
          UpdateType.PATCH,
          Object.assign({}, this._routePoint, {offers: this._originalOffers.slice()})
      );
      this._replaceFormToRoutePoint();
    }
  }
  _handleClickHandler() {
    this._replaceRoutePointToForm();
  }
  _handleSubmitHandler(routePoint) {
    this._originalOffers = routePoint.offers.slice();
    this._changeData(UserAction.UPDATE_POINT, this._currentUpdateType, routePoint);
    this._replaceFormToRoutePoint();
  }
  _handleResetHandler() {
    this._routePointFormComponent.reset(this._routePoint);
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        Object.assign({}, this._routePoint, {offers: this._originalOffers.slice()})
    );
    this._replaceFormToRoutePoint();
  }
  _handleDeleteClick() {
    this._changeData(UserAction.DELETE_POINT, UpdateType.MINOR, this._routePoint);
  }

  _handleFavoriteHandler() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._routePoint,
            {
              isFavorite: !this._routePoint.isFavorite
            }
        )
    );
  }
  _handleFormOffers(title, price) {
    const offers = this._routePoint.offers.slice();
    const isOfferInclude = offers.some((offer) => offer.title === title);
    if (isOfferInclude) {
      this._changeData(
          UserAction.UPDATE_POINT,
          UpdateType.PATCH,
          this._routePoint = Object.assign(
              {},
              this._routePoint,
              {
                offers: offers.filter((offer) => offer.title !== title)
              }
          )
      );
    } else {
      offers.push({title, price});
      this._changeData(
          UserAction.UPDATE_POINT,
          UpdateType.PATCH,
          this._routePoint = Object.assign(
              {},
              this._routePoint,
              {
                offers
              }
          )
      );
    }
  }
}
