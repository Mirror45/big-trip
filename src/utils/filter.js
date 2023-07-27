import { FilterType } from "../const.js";
import { isPointTime } from "./point.js";

export const filter = {
  [FilterType.Everythingu]: (points) => points,
  [FilterType.Future]: (points) => points.filter(isPointTime),
  [FilterType.Past]: (points) => points.filter(!isPointTime),
};
