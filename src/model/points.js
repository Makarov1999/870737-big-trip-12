import Observer from "../utils/observer.js";
export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }
  setPoints(points) {
    this._points = points;
    this._sortPoints();
  }
  getPoints() {
    return this._points;
  }
  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error(`Imposible to update unexisting point`);
    }
    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];
    this._sortPoints();
    this._notify(updateType, update);
  }
  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];
    this._sortPoints();
    this._notify(updateType, update);
  }
  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];
    this._sortPoints();
    this._notify(updateType);
  }
  _sortPoints() {
    this._points.sort((left, right) => left.startTime - right.finishTime);
  }
}
