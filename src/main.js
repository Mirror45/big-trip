import MenuView from './view/menu.js';
import FilterView from './view/filters.js';
import StatsView from './view/stats.js';
import TablePresenter from './presenter/table.js';
import EventModel from './model/event.js';
import { generateEvent } from './mock/event.js';
import { RenderPosition, render, remove } from './utils/render.js';
import { MENU } from './const.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill(null).map(generateEvent);

const eventModel = new EventModel();
eventModel.setEvents(events);

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
const tablePresenter = new TablePresenter(eventsElement, infoElement, eventModel, filterComponent);

const handleNewClick = (evt) => {
  evt.preventDefault();
  tablePresenter.destroy();
  remove(statsComponent);
  tablePresenter.init();
  tablePresenter.createEvent();
  menuComponent.reset();
  filterComponent.reset();
}

const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MENU.TABLE:
      remove(tablePresenter._infoComponent);
      filterComponent.reset();
      remove(statsComponent);
      tablePresenter.init();
      break;
    case MENU.STATS:
      filterComponent.reset();
      tablePresenter.destroy();
      statsComponent = new StatsView(eventModel.getEvents());
      render(pageBodyElement, statsComponent, RenderPosition.BEFOREEND);
      tablePresenter._renderInfo();
      break;
  }
};

menuComponent.setMenuClickHandler(handleMenuClick);

render(navigationElement, menuComponent, RenderPosition.BEFOREEND);
render(filtersElement, filterComponent, RenderPosition.BEFOREEND);

tablePresenter.init();
tablePresenter.setNewClickHandle(handleNewClick);
