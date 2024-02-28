import Abstract from './abstract.js';
import { SORT } from '../const.js';

const sort = ['day', 'event', 'time', 'price', 'offer'];

const createSortTemplate = (currentSortType = SORT.DAY) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
                ${sort.map((type) => {
    const status = type == currentSortType ? ' checked' : Object.values(SORT).includes(type) ? '' : ' disabled';

    return `<div class="trip-sort__item  trip-sort__item--${type}">
                  <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}"${status}>
                  <label class="trip-sort__btn" for="sort-${type}">${type}</label>
                </div>`;
  }).join('')}
              </form>`;
};

export default class Sort extends Abstract {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    this._callback.sortTypeChange(evt.target.value.match(/\w+$/)[0]);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('change', this._sortTypeChangeHandler);
  }
}
