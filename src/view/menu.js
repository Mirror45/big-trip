import Abstract from './abstract.js';
import { MENU } from '../const.js';

const createMenuTemplate = (menu) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${Object.values(MENU).map((type) => {
    const active = type == menu ? ' trip-tabs__btn--active' : '';
    return `<a class="trip-tabs__btn${active}" href="#">${type}</a>`;
  }).join('')}
          </nav>`;
};

export default class Menu extends Abstract {
  constructor(type = MENU.TABLE) {
    super();
    this._type = type;
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this.reset = this.reset.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._type);
  }

  _menuClickHandler(evt) {
    const type = evt.target.textContent;
    if (evt.target.tagName !== 'A' || this._type === type) {
      return;
    }

    evt.preventDefault();
    this.getElement().querySelector('.trip-tabs__btn--active').classList.remove('trip-tabs__btn--active');
    evt.target.classList.add('trip-tabs__btn--active');
    this._type = type;
    this._callback.menuClick(type);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  reset() {
    this._type = MENU.TABLE;
    this.getElement().querySelector('.trip-tabs__btn--active').classList.remove('trip-tabs__btn--active');
    this.getElement().querySelector('.trip-tabs__btn').classList.add('trip-tabs__btn--active');
  }
}
