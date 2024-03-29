import EventModel from '../model/event.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({ url: 'points' })
      .then(Api.toJSON)
      .then((events) => events.map(EventModel.adaptToClient));
  }

  getOffers() {
    return this._load({ url: 'offers' })
      .then(Api.toJSON);
  }

  getDestinations() {
    return this._load({ url: 'destinations' })
      .then(Api.toJSON);
  }

  getData() {
    return Promise.all([
      this.getOffers(),
      this.getDestinations(),
      this.getEvents(),
    ])
      .catch(Api.catchError);
  }

  updateEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(EventModel.adaptToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then(Api.toJSON)
      .then(EventModel.adaptToClient);
  }

  addEvent(point) {
    return this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(EventModel.adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then(Api.toJSON)
      .then(EventModel.adaptToClient);
  }

  deleteEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: Method.DELETE,
    });
  }

  sync(data) {
    return this._load({
      url: 'points/sync',
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      { method, body, headers },
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
