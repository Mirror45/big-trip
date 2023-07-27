import SortView from "../view/sort.js";
import PointListView from "../view/point-list.js";
import NoPointView from "../view/no-point.js";
import PointPresenter, { State } from "./point.js";
import { render, RenderPosition, remove } from "../utils/render.js";
import { sortPrice, sortTime, sortDay } from "../utils/point.js";
import { filter } from "../utils/filter.js";
import { SortType, UpdateType, UserAction } from "../const.js";

export default class Board {
  constructor(boardContainer, pointsModel, filterModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._isLoading = false;
    this._api = api;

    this._sortComponent = null;

    this._pointListComponent = new PointListView();
    this._noPointComponent = new NoPointView();
    this._loadingComponent = document.querySelector(
      ".trip-main__event-add-btn"
    );

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    render(
      this._boardContainer,
      this._pointListComponent,
      RenderPosition.BEFOREEND
    );

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filtredPoints.sort(sortDay);
      case SortType.PRICE:
        return filtredPoints.sort(sortPrice);
      case SortType.TIME:
        return filtredPoints.sort(sortTime);
    }

    return filtredPoints;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.ADD_POINT:
        //this._pointNewPresenter.setSaving();
        this._api
          .addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            //this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(State.SAVING);
        this._api
          .deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(State.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({
          resetRenderedPointCount: true,
          resetSortType: true,
        });
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._noPointComponent);
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({ resetRenderedPointCount: true });
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(
      this._boardContainer,
      this._sortComponent,
      RenderPosition.AFTERBEGIN
    );
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(
      this._pointListComponent,
      this._handleViewAction,
      this._handleModeChange
    );
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(
      this._boardContainer,
      this._noPointComponent,
      RenderPosition.AFTERBEGIN
    );
  }

  _clearBoard({ resetRenderedPointCount = false, resetSortType = false } = {}) {
    const pointCount = this._getPoints().length;

    //this._pointNewPresenter.destroy();
    Object.values(this._pointPresenter).forEach((presenter) =>
      presenter.destroy()
    );
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointComponent);
    this._loadingComponent.disabled = false;

    if (!resetRenderedPointCount) {
      this._renderedPointCount = Math.min(pointCount, this._renderedPointCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderBoard() {
    this._loadingComponent.disabled = this._isLoading;
    if (this._isLoading) return;

    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();

    this._renderPoints(points);
  }
}
