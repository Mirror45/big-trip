import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
    this._offers = [];
    this._destinations = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === point.id);

    if (index === -1) {
      throw new Error("Can't update unexisting point");
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
      throw new Error("Can't delete unexisting point");
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
      date_from:
        point.startTime instanceof Date ? point.startTime.toISOString() : null, // На сервере дата хранится в ISO формате
      date_to:
        point.endTime instanceof Date ? point.endTime.toISOString() : null,
      is_favorite: point.isFavorite,
      base_price: point.price,
    });

    // Ненужные ключи мы удаляем
    delete adaptedPoint.startTime;
    delete adaptedPoint.endTime;
    delete adaptedPoint.price;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
