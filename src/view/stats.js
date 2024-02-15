import { createElement } from '../util.js';

const createStatsTemplate = () => {
  return `<section class="statistics">
                <h2 class="visually-hidden">Trip statistics</h2>

                <div class="statistics__item statistics__item--money">
                  <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
                </div>

                <div class="statistics__item statistics__item--transport">
                  <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
                </div>

                <div class="statistics__item statistics__item--time-spend">
                  <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
                </div>
              </section>`;
};


export default class Stats {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};
