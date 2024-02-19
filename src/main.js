import MenuView from './view/menu.js';
import FilterView from './view/filters.js';
import TablePresenter from './presenter/table.js';
import { generateEvent } from './mock/event.js';
import { RenderPosition, render } from './utils/render.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill(null).map(generateEvent);

const siteHeaderElement = document.querySelector('.page-header');
const headerMainElement = siteHeaderElement.querySelector('.trip-main');
const controlsNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const controlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const eventsElement = siteMainElement.querySelector('.trip-events');

const tablePresenter = new TablePresenter(eventsElement, headerMainElement);

render(controlsNavigationElement, new MenuView(), RenderPosition.BEFOREEND);
render(controlsFiltersElement, new FilterView(), RenderPosition.BEFOREEND);

tablePresenter.init(events);
