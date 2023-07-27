import SmartView from "./smart.js";
import { TYPE, CITY, DESCRIPTION, PICTURES, OFFERS } from "../const.js";
import Time from "../utils/point.js";

const BLANK_POINT = {
  id: 1,
  type: TYPE[0],
  price: "",
  destination: { name: CITY[0], description: DESCRIPTION, pictures: PICTURES },
  offers: OFFERS,
};

const createTypeItemTemlate = (type, id, item) => {
  return ` <div class="event__type-item">
                <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${
    type === item ? "checked" : ""
  }>
                <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-${id}">${item}</label>
              </div>`;
};

const createDataListTemlate = (item) => {
  return `<option value="${item}"></option>`;
};

const createDestinationPhotoTemlate = ({ src, description }) => {
  return `<img class="event__photo" src="${src}" alt="${description}">`;
};

const createDestinationTemlate = ({ description, pictures }) => {
  return `<section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${pictures.map(createDestinationPhotoTemlate).join("")}
                  </div>
                </div>
              </section>`;
};

const createOfferItemTemlate = ({ title, price }, id) => {
  const type = title.match(/(\w+)(\sclass)?$/)[1];

  return `<div class="event__available-offers">
                <div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}">
                  <label class="event__offer-label" for="event-offer-${type}-${id}">
                    <span class="event__offer-title">${title}</span>
                    +€&nbsp;
                    <span class="event__offer-price">${price}</span>
                  </label>
                </div>`;
};

const createOffersTemlate = (offers, id) => {
  return `<section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                ${offers
                  .map((item) => createOfferItemTemlate(item, id))
                  .join("")}
              </section>`;
};

const createPointEditTemplate = ({
  price,
  type,
  id,
  destination,
  startTime,
  endTime,
  offers,
}) => {
  const start = new Time(startTime);
  const end = new Time(endTime);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                        <legend class="visually-hidden">Event type</legend>

                       ${TYPE.map((item) =>
                         createTypeItemTemlate(type, id, item).join("")
                       )}
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${
    destination.name
  }" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${CITY.map(createDataListTemlate)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${
    start.DDMMYYHHmm
  }>
                    —
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${
    end.DDMMYYHHmm
  }">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${
                    arguments[0] === BLANK_POINT ? "Cancel" : "Delete"
                  }</button>
                </header>

                <section class="event__details">
                  ${offers.length ? createOffersTemlate(offers, id) : ""}

                  ${
                    destination.length
                      ? createDestinationTemlate(destination)
                      : ""
                  }
                </section>
              </form>
            </li>`;
};

export default class PointEdit extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._data = point;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
  }

  removeElement() {
    super.removeElement();
  }

  reset(point) {
    this.updateData(point);
  }

  getTemplate() {
    return createPointEditTemplate(this._data);
  }

  restoreHandlers() {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement()
      .querySelector("form")
      .addEventListener("submit", this._formSubmitHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._data);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelector(".event__reset-btn")
      .addEventListener("click", this._formDeleteClickHandler);
  }
}
