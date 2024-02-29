import Abstract from './abstract.js';
import { MENU } from '../const.js';

const createMenuTemplate = (menu = MENU.TABLE) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            ${Object.values(MENU).map((type) => {
    const active = type == menu ? ' trip-tabs__btn--active' : '';
    return `<a class="trip-tabs__btn${active}" href="#">${type}</a>`;
  }).join('')}
          </nav>`;
};

export default class Menu extends Abstract {
  constructor(type) {
    super();
    this._type = type;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._type);
  }

  _menuClickHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.menuClick(evt.target.textContent);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}
