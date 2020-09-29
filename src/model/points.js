import Observer from "../utils/observer.js";
export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }
  setPoints(updateType, points) {
    this._points = points;
    this._sortPoints();
    this._notify(updateType, points);
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

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          // id: Number(point.id),
          startTime: new Date(point.date_from),
          finishTime: new Date(point.date_to),
          cost: point.base_price,
          isFavorite: point.is_favorite
        }
    );
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }
  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "date_from": point.startTime.toString(),
          "date_to": point.finishTime.toString(),
          "base_price": point.cost,
          "is_favorite": point.isFavorite
        }
    );

    delete adaptedPoint.startTime;
    delete adaptedPoint.finishTime;
    delete adaptedPoint.cost;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
