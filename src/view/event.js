import Abstract from './abstract.js';
import { getFormat, getTime } from '../utils/event.js';

const createOffersTemplate = (offers) => {
  if (!offers.length) return '';
  return `<h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${offers.map(({ title, price }) => `<li class="event__offer">
                  <span class="event__offer-title">${title}</span>
                    +€&nbsp;
                  <span class="event__offer-price">${price}</span>
                </li>`).join('')}
              </ul>`;
};

const createEventTemplate = ({ totalPrice, startTime, endTime, destination, isFavorite, offers, type }) => {
  const startFormat = getFormat(startTime);
  const endFormat = getFormat(endTime);
  const favoriteClassName = isFavorite ? ' event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${startFormat.YMD}">${startFormat.MD}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startFormat.YMDHM}">${startFormat.HM}</time>
                    —
                    <time class="event__end-time" datetime="${endFormat.YMDHM}">${endFormat.HM}</time>
                  </p>
                  <p class="event__duration">${getTime(startTime, endTime)}</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${totalPrice}</span>
                </p>
                ${createOffersTemplate(offers)}
                <button class="event__favorite-btn${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class Event extends Abstract {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
}
