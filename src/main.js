import MenuView from './view/menu.js';
import FilterView from './view/filters.js';
import StatsView from './view/stats.js';
import TablePresenter from './presenter/table.js';
import EventModel from './model/event.js';
import { RenderPosition, render, remove } from './utils/render.js';
import { isOnline } from './utils/common.js';
import { toast } from './utils/toast.js';
import { MENU, UpdateType } from './const.js';
import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

const AUTHORIZATION = 'Basic 8ApA45dt37Sn6cSx0';
const END_POINT = 'https://14.ecmascript.htmlacademy.pro/big-trip';
const STORE_PREFIX = 'big-trip-localstorage';
const STORE_VER = 'v14';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
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
const tablePresenter = new TablePresenter(eventsElement, infoElement, eventModel, filterComponent, apiWithProvider);

const handleNewClick = (evt) => {
  evt.preventDefault();
  tablePresenter.destroy();
  remove(statsComponent);
  tablePresenter.init();
  menuComponent.reset();
  if (!isOnline()) {
    toast('You can\'t create new event offline');
    return;
  }

  tablePresenter.createEvent();
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

apiWithProvider.getEvents().then((events) => {
  //eventModel.setOffers(offers);
  //eventModel.setDestinations(destinations);
  eventModel.setEvents(UpdateType.INIT, events);
  menuComponent.setMenuClickHandler(handleMenuClick);
  tablePresenter.setNewClickHandle(handleNewClick);
}).catch(() => {
  eventModel.setEvents(UpdateType.INIT, []);
  menuComponent.setMenuClickHandler(handleMenuClick);
  tablePresenter.setNewClickHandle(handleNewClick);
});

window.addEventListener('load', () => {
  //navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
