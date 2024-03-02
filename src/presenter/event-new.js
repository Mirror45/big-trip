import EventEditView from '../view/event-edit.js';
import { nanoid } from 'nanoid';
import { remove, render, RenderPosition } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class EventNew {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._eventEditComponent = null;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventEditView();
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._eventEditComponent.setEditClickHandler(this._handleClick);

    render(this._eventListContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(event) {
    this._changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      Object.assign({ id: nanoid() }, event),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleClick() {
    this.destroy();
  }
}
