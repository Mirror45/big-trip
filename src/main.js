import MenuView from './view/menu.js';
import FilterView from './view/filters.js';
import TablePresenter from './presenter/table.js';
import EventModel from './model/event.js';
import { generateEvent } from './mock/event.js';
import { RenderPosition, render } from './utils/render.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill(null).map(generateEvent);

const eventModel = new EventModel();
eventModel.setEvents(events);

const siteHeaderElement = document.querySelector('.page-header');
const infoElement = siteHeaderElement.querySelector('.trip-main');
const navigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const eventsElement = siteMainElement.querySelector('.trip-events');

const filterComponent = new FilterView();
const tablePresenter = new TablePresenter(eventsElement, infoElement, eventModel, filterComponent);

render(navigationElement, new MenuView(), RenderPosition.BEFOREEND);
render(filtersElement, filterComponent, RenderPosition.BEFOREEND);

tablePresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tablePresenter.createEvent();
});
