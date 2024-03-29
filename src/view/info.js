import Abstract from './abstract.js';
import { getFormat } from '../utils/event.js';

const createInfoTemplate = (events) => {
  if (events.length === 0) {
    return '<span class="visually-hidden"></span>';
  }

  const city = new Set();
  const totalPrice = events.reduce((a, { price, destination }) => {
    if (city.size < 3) {
      city.add(destination.name);
    }

    return a + price;
  }, 0);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${[...city].join(' — ')}</h1>

              <p class="trip-info__dates">${getFormat(events[0].startTime).MD}&nbsp;—&nbsp;${getFormat(events[events.length - 1].endTime).D}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
            </p>
          </section>`;
};

export default class Info extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createInfoTemplate(this._events);
  }
}
