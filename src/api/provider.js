import EventModel from '../model/event.js';
import { isOnline } from '../utils/common.js';

const getSyncedPoints = (items) => {
  return items.filter(({ success }) => success)
    .map(({ payload }) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    if (isOnline()) this._store.setItems({});
  }

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createStoreStructure(events.map(EventModel.adaptToServer));
          this._store.setItem('events', items);
          return events;
        });
    }

    const storeEvents = Object.values(this._store.getItems().events);

    return Promise.resolve(storeEvents.map(EventModel.adaptToClient));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setItem('offers', offers);
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems().offers);

    return Promise.resolve(storeOffers);
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setItem('destinations', destinations);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getItems().destinations);

    return Promise.resolve(storeDestinations);
  }

  getData() {
    return Promise.all([
      this.getOffers(),
      this.getDestinations(),
      this.getEvents(),
    ])
      .catch(this._api.catchError);
  }

  updateEvent(event) {
    const { events } = this._store.getItems();
    events[event.id] = EventModel.adaptToServer(event);
    this._store.setItem('events', events);

    if (isOnline()) {
      return this._api.updateEvent(event)
        .then((updatedEvent) => updatedEvent);
    }

    return Promise.resolve(event);
  }

  addEvent(event) {
    if (isOnline()) {
      return this._api.addEvent(event)
        .then((newEvent) => {
          const { events } = this._store.getItems();
          events[newEvent.id] = EventModel.adaptToServer(newEvent);
          this._store.setItem('events', events);
          return newEvent;
        });
    }

    return Promise.reject(new Error('Add event failed'));
  }

  deleteEvent(event) {
    if (isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => {
          const { events } = this._store.getItems();
          delete events[event.id];
          this._store.setItem('events', events);
        });
    }

    return Promise.reject(new Error('Delete event failed'));
  }

  sync() {
    if (isOnline()) {
      const storeEvents = Object.values(this._store.getItems().events);

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = getSyncedPoints(response.created);
          const updatedEvents = getSyncedPoints(response.updated);

          const events = createStoreStructure([...createdEvents, ...updatedEvents]);

          this._store.setItem('events', events);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
