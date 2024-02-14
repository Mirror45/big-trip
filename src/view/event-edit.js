import { getFormat } from '../util.js';
import { TYPE, OFFERS, CITY } from '../const.js';

const createTypeItemTempalte = (type) => {
  return TYPE.map((e) => {
    const checked = type == e ? ' checked' : '';
    return `<div class="event__type-item">
                  <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}"${checked}>
                  <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${e[0].toUpperCase() + e.slice(1)}</label>
                </div>`
  }).join('');
};

const createDestinationListTempalte = () => {
  return CITY.map((e) => {
    return `<option value="${e}"></option>`;
  }).join('');
};

const createOfferSelectorTemplate = (offers) => {
  return OFFERS.map(({ title, price }) => {
    const id = title.match(/\w+$/);
    const checked = offers.some((e) => {
      return e.title == title;
    }) ? ' checked' : '';

    return `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}"${checked}>
                  <label class="event__offer-label" for="event-offer-${id}-1">
                    <span class="event__offer-title">${title}</span>
                    +€&nbsp;
                    <span class="event__offer-price">${price}</span>
                  </label>
                </div>`;
  }).join('');
}

const createPhotosTapeTemplate = ({ pictures }) => {
  if (!pictures.length) return '';
  return `<div class="event__photos-container">
                <div class="event__photos-tape">
                  ${pictures.map(({ src, description }) => {
    return `<img class="event__photo" src="${src}" alt="${description}">`;
  }).join('')}
                </div>
              </div>`;
};

export const createEventEditTemplate = ({ totalPrice, startTime, endTime, destination, offers, type }) => {
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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createDestinationListTempalte()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormat(startTime).YMDHm}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormat(endTime).YMDHm}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${totalPrice}">
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
