import he from 'he';
import Smart from './smart.js';
import { TYPE, OFFERS, CITY } from '../const.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.js';
import { generateEvent } from '../mock/event.js';

const createTypeItemTempalte = (type) => {
  return TYPE.map((e) => {
    const checked = type == e ? ' checked' : '';

    return `<div class="event__type-item">
                  <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}"${checked}>
                  <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${e[0].toUpperCase() + e.slice(1)}</label>
                </div>`;
  }).join('');
};

const createOfferSelectorTemplate = (offers) => {

  return OFFERS.map(({ title, price }) => {
    const id = title.match(/\w+$/);
    const checked = offers.some((e) => e.title == title) ? ' checked' : '';

    return `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}"${checked}>
                  <label class="event__offer-label" for="event-offer-${id}-1">
                    <span class="event__offer-title">${title}</span>
                    +€&nbsp;
                    <span class="event__offer-price">${price}</span>
                  </label>
                </div>`;
  }).join('');
};

const createPhotosTapeTemplate = ({ pictures }) => {
  if (!pictures.length) return '';
  return `<div class="event__photos-container">
                <div class="event__photos-tape">
                  ${pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
                </div>
              </div>`;
};

const createEventEditTemplate = ({ price, destination, offers, type }) => {
  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createTypeItemTempalte(type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${CITY.map((city) => `<option value="${city}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${createOfferSelectorTemplate(offers)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>
                    ${createPhotosTapeTemplate(destination)}
                  </section>
                </section>
              </form>
            </li>`;
};

export default class EventEdit extends Smart {
  constructor(event = generateEvent()) {
    super();
    this._event = EventEdit.parseEventToData(event);
    this._startDatepicker = null;
    this._endDatepicker = null;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._startChangeHandler = this._startChangeHandler.bind(this);
    this._endChangeHandler = this._endChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this._setInnerHandlers();
    this._setStartDatepiker();
    this._setEndDatepiker();
  }

  reset(event) {
    this.updateData(EventEdit.parseEventToData(event));
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepiker();
    this._setEndDatepiker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setStartDatepiker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }


    this._startDatepicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'y/m/d H:i',
        defaultDate: this._event.startTime,
        onChange: this._startChangeHandler,
        enableTime: true,
      },
    );
  }

  _setEndDatepiker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }


    this._endDatepicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'y/m/d H:i',
        defaultDate: this._event.endTime,
        onChange: this._endChangeHandler,
        enableTime: true,
      },
    );
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  _cityInputHandler(evt) {
    evt.preventDefault();
    this.updateData({ destination: { ...this._event.destination, name: evt.target.value } }, true);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-list').addEventListener('change', this._typeChangeHandler);
    this.getElement().querySelector('#event-price-1').addEventListener('input', this._priceInputHandler);
    this.getElement().querySelector('#event-destination-1').addEventListener('input', this._cityInputHandler);
    this.getElement().querySelector('.event__section--offers').addEventListener('change', this._offerChangeHandler);
  }

  _startChangeHandler([startTime]) {
    this.updateData({
      startTime,
    });
  }

  _endChangeHandler([endTime]) {
    this.updateData({
      endTime,
    });
  }

  _offerChangeHandler(evt) {
    evt.preventDefault();
    const offers = [];
    const title = evt.target.parentElement.querySelector('.event__offer-title').textContent;

    if (evt.target.checked) offers.push(OFFERS.find((item) => item.title == title));

    this._event.offers.forEach((item) => {
      if (title != item.title) offers.push(item);
    });

    this.updateData({ offers }, true);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._event));
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._event));
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign({}, event);
  }

  static parseDataToEvent(event) {
    return Object.assign({}, event);
  }
}
