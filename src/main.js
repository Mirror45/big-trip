import InfoView from './view/info.js';
import MenuView from './view/menu.js';
import FilterView from './view/filters.js';
import SortView from './view/sort.js';
import EventListView from './view/events-list.js';
import EventEditView from './view/event-edit.js';
import EventView from './view/event.js';
import EmptyView from './view/empty.js';
import StatsView from './view/stats.js';
import { generateEvent } from './mock/event.js';
import { render, RenderPosition } from './util.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill(null).map(generateEvent);

const siteHeaderElement = document.querySelector('.page-header');
const headerMainElement = siteHeaderElement.querySelector('.trip-main');
const controlsNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const controlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const eventsElement = siteMainElement.querySelector('.trip-events');


render(controlsNavigationElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(controlsFiltersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

if (events.length) {
  render(headerMainElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);
} else {
  render(eventsElement, new EmptyView().getElement(), RenderPosition.BEFOREEND);
}
