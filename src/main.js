import { createInfoTemplate } from './view/info.js';
import { createTabsTemplate } from './view/tabs.js';
import { createFiltersTemplate } from './view/filters.js';
import { createSortTemplate } from './view/sort.js';
import { createEventsListTemplate } from './view/events-list.js';
import { createEventEditTemplate } from './view/event-edit.js';
import { createEventTemplate } from './view/event.js';

const EVENT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const headerMainElement = siteHeaderElement.querySelector('.trip-main');
const controlsNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const controlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(headerMainElement, createInfoTemplate(), 'afterbegin');
render(controlsNavigationElement, createTabsTemplate(), 'beforeend');
render(controlsFiltersElement, createFiltersTemplate(), 'beforeend');

const siteMainElement = document.querySelector('.page-main');
const eventsElement = siteMainElement.querySelector('.trip-events');

render(eventsElement, createSortTemplate(), 'beforeend');
render(eventsElement, createEventsListTemplate(), 'beforeend');

const eventsListElement = siteMainElement.querySelector('.trip-events__list');

render(eventsListElement, createEventEditTemplate(), 'beforeend');

for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventsListElement, createEventTemplate(), 'beforeend');
}
