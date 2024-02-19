import Abstract from './abstract.js';
import { sortDay, getFormat } from '../utils/event.js';

const createInfoTemplate = (events) => {
  const city = new Set();
  const sort = events.slice().sort(sortDay);
  const price = events.reduce((a, { totalPrice, destination }) => {
    city.add(destination.name);
    return a + totalPrice;
  }, 0);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${[...city].join(' — ')}</h1>

              <p class="trip-info__dates">${getFormat(sort[0].startTime).MD}&nbsp;—&nbsp;${getFormat(sort[sort.length - 1].endTime).D}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${price}</span>
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
