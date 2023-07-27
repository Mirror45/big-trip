import MenuView from "./view/menu.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import { render, RenderPosition } from "./utils/render.js";
import { UpdateType, FilterType } from "./const.js";
import Api from "./api.js";

const AUTHORIZATION = "Basic T6cN9Zp84j";
const END_POINT = "https://14.ecmascript.pages.academy/big-trip";

const siteTripEvents = document.querySelector(".trip-events");
const siteTripControlsNavigation = document.querySelector(
  ".trip-controls__navigation"
);
const siteTripControlsFilters = document.querySelector(
  ".trip-controls__filters"
);

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const Menu = new MenuView();

const boardPresenter = new BoardPresenter(
  siteTripEvents,
  pointsModel,
  filterModel,
  api
);
const filterPresenter = new FilterPresenter(
  siteTripControlsFilters,
  filterModel,
  pointsModel
);

filterPresenter.init();
boardPresenter.init();

api
  .getPoints()
  //.then(console.log)
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    render(siteTripControlsNavigation, Menu, RenderPosition.BEFOREEND);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(siteTripControlsNavigation, Menu, RenderPosition.BEFOREEND);
  });
