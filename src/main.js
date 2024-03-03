import MenuView from './view/menu.js';
import FilterView from './view/filters.js';
import StatsView from './view/stats.js';
import TablePresenter from './presenter/table.js';
import EventModel from './model/event.js';
import { RenderPosition, render, remove } from './utils/render.js';
import { MENU, UpdateType } from './const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic EvD824Rb92UsRefzK9';
const END_POINT = 'https://14.ecmascript.htmlacademy.pro/big-trip/';

const api = new Api(END_POINT, AUTHORIZATION);
const eventModel = new EventModel();

const siteHeaderElement = document.querySelector('.page-header');
const infoElement = siteHeaderElement.querySelector('.trip-main');
const navigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const pageBodyElement = siteMainElement.querySelector('.page-body__container');
const eventsElement = siteMainElement.querySelector('.trip-events');

let statsComponent = null;
const menuComponent = new MenuView();
const filterComponent = new FilterView();
const tablePresenter = new TablePresenter(eventsElement, infoElement, eventModel, filterComponent, api);

const handleNewClick = (evt) => {
  evt.preventDefault();
  tablePresenter.destroy();
  remove(statsComponent);
  tablePresenter.init();
  tablePresenter.createEvent();
  menuComponent.reset();
};

const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MENU.TABLE:
      remove(statsComponent);
      tablePresenter.init();
      break;
    case MENU.STATS:
      tablePresenter.destroy();
      statsComponent = new StatsView(eventModel.getEvents());
      render(pageBodyElement, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

render(navigationElement, menuComponent, RenderPosition.BEFOREEND);
render(filtersElement, filterComponent, RenderPosition.BEFOREEND);

tablePresenter.init();

api.getEvents().then((events) => {
  eventModel.setEvents(UpdateType.INIT, events);
  menuComponent.setMenuClickHandler(handleMenuClick);
  tablePresenter.setNewClickHandle(handleNewClick);
}).catch(() => {
  eventModel.setEvents(UpdateType.INIT, []);
  menuComponent.setMenuClickHandler(handleMenuClick);
  tablePresenter.setNewClickHandle(handleNewClick);
});
