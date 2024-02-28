import Abstract from './abstract.js';
import { FILTER } from '../const.js';

const createFiltersTemplate = (currentFilterType = FILTER.EVERYTHING) => {
  return `<form class="trip-filters" action="#" method="get">
                ${Object.values(FILTER).map((filter) => {
    const checked = filter == currentFilterType ? ' checked' : '';

    return `<div class="trip-filters__filter">
                  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}"${checked}>
                  <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
                </div>`;
  }).join('')}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
};

export default class Filter extends Abstract {
  constructor(currentFilterType) {
    super();
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
