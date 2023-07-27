import PointView from "../view/point.js";
import PointEditView from "../view/point-edit.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";
import { UserAction, UpdateType } from "../const.js";

const Mode = {
  DEFAULT: "DEFAULT",
  EDITING: "EDITING",
};

export const State = {
  SAVING: "SAVING",
  DELETING: "DELETING",
  ABORTING: "ABORTING",
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new PointView(point);

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(
        this._pointListContainer,
        this._pointComponent,
        RenderPosition.BEFOREEND
      );
      return;
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign({}, this._point, {
        isFavorite: !this._point.isFavorite,
      })
    );
  }

  destroy() {
    remove(this._pointComponent);
    //remove(this._pointEditComponent);
  }
}
