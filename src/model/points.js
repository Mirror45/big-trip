import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._tasks;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === point.id);

    if (index === -1) {
      throw new Error("Can't update unexisting task");
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [update, ...this._points];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error("Can't delete unexisting task");
    }

    this._ponts = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign({}, point, {
      startTime:
        point.date_from !== null ? new Date(point.date_from) : point.date_from, // На клиенте дата хранится как экземпляр Date
      endTime: point.date_to !== null ? new Date(point.date_to) : point.date_to,
      isFavorite: point.is_favorite,
      price: point.base_price,
    });

    // Ненужные ключи мы удаляем
    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign({}, point, {
      date_from: point instanceof Date ? point.startTime.toISOString() : null, // На сервере дата хранится в ISO формате
      date_to: point instanceof Date ? point.endTime.toISOString() : null,
      is_favorite: point.isFavorite,
      base_price: price,
    });

    // Ненужные ключи мы удаляем
    delete adaptedPoint.startTime;
    delete adaptedPoint.endTime;
    delete adaptedPoint.price;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
