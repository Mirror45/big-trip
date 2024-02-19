import InfoView from '../view/info.js';
import SortView from '../view/sort.js';
import EventListView from '../view/events-list.js';
import EmptyView from '../view/empty.js';
import { render, RenderPosition, replace } from '../utils/render.js';
import EventEditView from '../view/event-edit.js';
import EventView from '../view/event.js';

export default class Table {
  constructor(tableContainer, infoContainer) {
    this._tableContainer = tableContainer;
    this._infoContainer = infoContainer;
    this._eventPresenter = {};
    this._sortCompoment = new SortView();
    this._eventListCompoment = new EventListView();
    this._emptyComponent = new EmptyView();
  }

  init(tableEvent) {
    this._infoComponent = new InfoView(tableEvent);
    this._tableEvent = tableEvent.slice();
    render(this._tableContainer, this._eventListCompoment, RenderPosition.BEFOREEND);
    this._renderTable();
  }

  _renderEmpty() {
    render(this._tableContainer, this._emptyComponent, RenderPosition.BEFOREEND);
  }

  _renderInfo() {
    render(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._tableContainer, this._sortCompoment, RenderPosition.BEFOREEND);
  }

  _renderList() {
    render(this._tableContainer, this._eventListCompoment, RenderPosition.BEFOREEND);
  }

  _renderTable() {
    if (this._tableEvent.length === 0) {
      this._renderEmpty();
      return;
    }

    this._renderInfo();
    this._renderList();
    this._tableEvent.forEach((tableEvent) => this._renderEvent(tableEvent));
  }

  _renderEvent(event) {
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

    render(this._eventListCompoment, eventComponent, RenderPosition.BEFOREEND);
  }
}
