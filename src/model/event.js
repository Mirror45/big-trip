import Observer from '../utils/observer.js';

export default class Event extends Observer {
  constructor() {
    super();
    this._events = [];
    this._offers = [];
    this._destinations = [];
  }

  setEvents(updateType, events, offers, destinations) {
    this._events = events.slice();
    this._offers = offers.slice();
    this._destinations = destinations.slice();
    this._notify(updateType);
  }

  getEvents() {
    return this._events;
  }

  getOffers() {
    return this._offers;
  }

  getDestinations() {
    return this._destinations;
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(event) {
    const adaptedEvent = Object.assign(
      {},
      event,
      {
        price: event.base_price,
        isFavorite: event.is_favorite,
        startTime: new Date(event.date_from),
        endTime: new Date(event.date_to),
      },
    );

    delete adaptedEvent.base_price;
    delete adaptedEvent.is_favorite;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = Object.assign(
      {},
      event,
      {
        base_price: event.price,
        is_favorite: event.isFavorite,
        date_from: event.startTime.toISOString(),
        date_to: event.endTime.toISOString(),
      },
    );

    delete adaptedEvent.price;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.startTime;
    delete adaptedEvent.endTime;

    return adaptedEvent;
  }
}

