import PointsModel from "./model/points.js";
/*Пункты назначения /destinations
Общий список дополнительных предложений /offers

{
  Destination: {
    description:
      "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
    name: "Chamonix",
    pictures: [
      {
        src: "http://picsum.photos/300/200?r=0.0762563005163317",
        description: "Chamonix parliament building",
      },
    ],
  },

  Offer: {
    type: "taxi",
    offers: [
      {
        title: "Upgrade to a business class",
        price: 120,
      },
      {
        title: "Choose the radio station",
        price: 60,
      },
    ],
  },

  Point: {
    base_price: 1100,
    date_from: "2019-07-10T22:55:56.845Z",
    date_to: "2019-07-11T11:22:13.375Z",
    destination: $Destination$,
    id: "0",
    is_favorite: false,
    offers: [
      {
        title: "Choose meal",
        price: 180,
      },
      {
        title: "Upgrade to comfort class",
        price: 50,
      },
    ],
    type: "bus",
  },

  type: [
    "taxi",
    "bus",
    "train",
    "ship",
    "transport",
    "drive",
    "flight",
    "check-in",
    "sightseeing",
    "restaurant",
  ],
}*/

const Method = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
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

  getPoints() {
    return this._load({ url: "points" })
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  addPoint(point) {
    return this._load({
      url: "points",
      method: Method.POST,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  deletePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
  }

  _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
    headers.append("Authorization", this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
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
