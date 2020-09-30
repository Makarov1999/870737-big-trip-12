import FormView from "../view/form.js";
import RoutePointView from "../view/route-point.js";
import {render, replace, remove} from "../utils/render.js";
import {ELEMENTS_POSITIONS, UserAction, UpdateType, State} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class RoutePoint {
  constructor(routePointContainer, changeData, changeMode, routePoint, offers, destinations) {
    this._originalOffers = routePoint.offers.slice();
    this._offers = offers;
    this._destinations = destinations;
    this._routePointContainer = routePointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._routePointComponent = null;
    this._routePointFormComponent = null;
    this._currentUpdateType = UpdateType.MINOR;
    this._mode = Mode.DEFAULT;
    this._handleClickHandler = this._handleClickHandler.bind(this);
    this._handleSubmitHandler = this._handleSubmitHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleResetHandler = this._handleResetHandler.bind(this);
    this._handleFavoriteHandler = this._handleFavoriteHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }
  init(routePoint) {
    this._routePoint = routePoint;
    this._prevRoutePointComponent = this._routePointComponent;
    this._prevRoutePointFormComponent = this._routePointFormComponent;
    this._routePointComponent = new RoutePointView(routePoint);
    this._routePointFormComponent = new FormView(this._offers, this._destinations, routePoint);
    this._routePointComponent.setClickHandler(this._handleClickHandler);
    this._routePointFormComponent.setSubmitHandler(this._handleSubmitHandler);
    this._routePointFormComponent.setResetHandler(this._handleResetHandler);
    this._routePointFormComponent.setDeleteHandler(this._handleDeleteClick);
    this._routePointFormComponent.setFavoriteClickHandler(this._handleFavoriteHandler);
    if (this._prevRoutePointComponent === null || this._prevRoutePointFormComponent === null) {
      render(this._routePointContainer, this._routePointComponent, ELEMENTS_POSITIONS.BEFOREEND);
      return;
    }
    if (this._mode === Mode.DEFAULT) {
      replace(this._routePointComponent, this._prevRoutePointComponent);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._routePointFormComponent, this._prevRoutePointFormComponent);
      this._mode = Mode.DEFAULT;
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
  setViewState(state) {
    const resetFormState = () => {
      this._routePointFormComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    switch (state) {
      case State.SAVING:
        this._routePointFormComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._routePointFormComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._routePointFormComponent.shake(resetFormState);
        this._routePointFormComponent.shake(resetFormState);
        break;
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
    this._changeData(UserAction.DELETE_POINT, UpdateType.MAJOR, this._routePoint);
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
}
