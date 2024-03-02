import InfoView from '../view/info.js';
import SortView from '../view/sort.js';
import EventListView from '../view/events-list.js';
import EmptyView from '../view/empty.js';
import EventPresenter from './event.js';
import EventNewPresenter from './event-new.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { sortDay, sortTime, sortPrice, filterFuture, filterPast } from '../utils/event.js';
import { SORT, FILTER, UpdateType, UserAction } from '../const.js';

export default class Table {
  constructor(tableContainer, infoContainer, eventModel, filterComponent) {
    this._eventModel = eventModel;
    this._tableContainer = tableContainer;
    this._infoContainer = infoContainer;
    this._eventPresenter = {};
    this._currentFilterType = FILTER.EVERYTHING;
    this._currentSortType = SORT.DAY;
    this._infoComponent = null;
    this._filterCompoment = filterComponent;
    this._sortComponent = new SortView();
    this._eventListCompoment = new EventListView();
    this._emptyComponent = new EmptyView();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._eventNewPresenter = new EventNewPresenter(this._eventListCompoment, this._handleViewAction);
  }

  init() {
    this._filterCompoment.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    render(this._tableContainer, this._eventListCompoment, RenderPosition.BEFOREEND);
    this._eventModel.addObserver(this._handleModelEvent);
    this._renderTable();
  }

  destroy() {
    this._clearTable({ reset: true });

    remove(this._eventListCompoment);
    remove(this._sortComponent);

    this._eventModel.removeObserver(this._handleModelEvent);
  }

  createEvent() {
    this._eventNewPresenter.init();
  }

  setNewClickHandle(callback) {
    this._infoContainer.querySelector('.trip-main__event-add-btn').addEventListener('click', callback);
  }

  _getEvents() {
    const events = this._eventModel.getEvents();
    let filters = events.slice();

    switch (this._currentFilterType) {
      case FILTER.FUTURE:
        filters = events.filter(filterFuture);
        break;
      case FILTER.PAST:
        filters = events.filter(filterPast);
        break;
    }

    switch (this._currentSortType) {
      case SORT.DAY:
        return filters.sort(sortDay);
      case SORT.PRICE:
        return filters.sort(sortPrice);
      case SORT.TIME:
        return filters.sort(sortTime);
    }
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTable();
        this._renderTable();
        break;
      case UpdateType.MAJOR:
        this._clearTable({ reset: true });
        this._renderTable();
        break;
    }
  }

  _handleSortTypeChange(type) {
    if (this._currentSortType === type) {
      return;
    }

    this._currentSortType = type;
    this._clearTable();
    this._renderTable();
  }

  _handleFilterTypeChange(type) {
    if (this._currentFilterType === type) {
      return;
    }

    this._currentFilterType = type;
    this._clearTable();
    this._renderTable();
  }


  _renderEmpty() {
    render(this._tableContainer, this._emptyComponent, RenderPosition.BEFOREEND);
  }

  _renderInfo() {
    const events = this._eventModel.getEvents().slice().sort(sortDay);
    this._infoComponent = new InfoView(events);
    render(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tableContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderList() {
    render(this._tableContainer, this._eventListCompoment, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListCompoment, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _clearTable({ reset = false } = {}) {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._emptyComponent);
    remove(this._infoComponent);

    if (reset) {
      this._currentFilterType = FILTER.EVERYTHING;
      this._currentSortType = SORT.DAY;
    }
  }

  _renderTable() {
    const events = this._getEvents();
    const eventCount = events.length;

    if (eventCount === 0) {
      this._renderEmpty();
      return;
    }

    this._renderInfo();
    this._renderSort();
    this._renderEvents(events);
  }
}
