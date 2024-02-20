import InfoView from '../view/info.js';
import SortView from '../view/sort.js';
import EventListView from '../view/events-list.js';
import EmptyView from '../view/empty.js';
import EventPresenter from './event.js';
import { updateItem } from '../utils/common.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { sortDay, sortTime, sortPrice } from '../utils/event.js';
import { SORT } from '../const.js';

export default class Table {
  constructor(tableContainer, infoContainer) {
    this._tableContainer = tableContainer;
    this._infoContainer = infoContainer;
    this._eventPresenter = {};
    this._currentSortType = SORT.DAY;
    this._infoComponent = null;
    this._sortCompoment = new SortView();
    this._eventListCompoment = new EventListView();
    this._emptyComponent = new EmptyView();
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tableEvent) {
    this._tableEvent = tableEvent.slice().sort(sortDay);
    this._infoComponent = new InfoView(this._tableEvent);
    render(this._tableContainer, this._eventListCompoment, RenderPosition.BEFOREEND);
    this._renderTable();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._tableEvent = updateItem(this._tableEvent, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _sortEvent(type) {
    switch (type) {
      case SORT.DAY:
        this._tableEvent.sort(sortDay);
        break;
      case SORT.TIME:
        this._tableEvent.sort(sortTime);
        break;
      case SORT.PRICE:
        this._tableEvent.sort(sortPrice);
        break;
    }

    this._currentSortType = type;
  }

  _renderEmpty() {
    render(this._tableContainer, this._emptyComponent, RenderPosition.BEFOREEND);
  }

  _renderInfo() {
    render(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _handleSortTypeChange(type) {
    this._sortEvent(type);
    this._clearList();
    this._renderEvents();
  }

  _renderSort() {
    render(this._tableContainer, this._sortCompoment, RenderPosition.BEFOREEND);
    this._sortCompoment.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderList() {
    render(this._tableContainer, this._eventListCompoment, RenderPosition.BEFOREEND);
  }

  _renderTable() {
    if (this._tableEvent.length === 0) {
      this._renderEmpty();
      return;
    }

    remove(this._emptyComponent);
    this._renderInfo();
    this._renderSort();
    this._renderList();
    this._renderEvents();
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListCompoment, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    this._tableEvent.forEach((tableEvent) => this._renderEvent(tableEvent));
  }
}
