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
import { RenderPosition, render, replace } from './utils/render.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT).fill(null).map(generateEvent);

const siteHeaderElement = document.querySelector('.page-header');
const headerMainElement = siteHeaderElement.querySelector('.trip-main');
const controlsNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const controlsFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const eventsElement = siteMainElement.querySelector('.trip-events');

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setEditClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTable = (tableContainer, tableEvents) => {
  if (tableEvents.length === 0) {
    render(tableContainer, new EmptyView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const eventsListComponent = new EventListView();

  render(headerMainElement, new InfoView(tableEvents).getElement(), RenderPosition.AFTERBEGIN);
  render(tableContainer, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(tableContainer, eventsListComponent.getElement(), RenderPosition.BEFOREEND);

  tableEvents.forEach((event) => {
    renderEvent(eventsListComponent.getElement(), event);
  });
};

export const renderStats = (statsContainer, statsEvents) => {
  if (statsEvents.length === 0) {
    render(statsContainer, new EmptyView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(headerMainElement, new InfoView(statsEvents).getElement(), RenderPosition.AFTERBEGIN);
  render(statsContainer, new StatsView(statsEvents).getElement(), RenderPosition.BEFOREEND);
};

render(controlsNavigationElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(controlsFiltersElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

renderTable(eventsElement, events);
