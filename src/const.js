export const TYPE = [
  "taxi",
  "bus",
  "train",
  "ship",
  "transport",
  "drive",
  "flight",
  "check-in",
  "sightseeing",
  "restaurant",
];

export const CITY = ["Amsterdam", "Geneva", "Chamonix"];

export const DESCRIPTION =
  "Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.";

export const PICTURES = new Array(5)
  .fill()
  .map((_, i) => ({ src: `img/photos/${i}.jpg`, description: "Event photo" }));

export const OFFERS = [
  { title: "Add luggage", price: 30 },
  { title: "Switch to comfort class", price: 100 },
  { title: "Add meal", price: 15 },
  { title: "Choose seats", price: 5 },
  { title: "Travel by train", price: 40 },
];

export const SortType = {
  DAY: "day",
  TIME: "time",
  PRICE: "price",
};

export const UpdateType = {
  PATCH: "PATCH",
  MINOR: "MINOR",
  MAJOR: "MAJOR",
  INIT: "INIT",
};

export const UserAction = {
  UPDATE_POINT: "UPDATE_POINT",
  ADD_POINT: "ADD_POINT",
  DELETE_POINT: "DELETE_POINT",
};

export const FilterType = {
  Everythingu: "everything",
  Future: "future",
  Past: "past",
};

export const isDatesEqual = (dateA, dateB) => {
  return dateA === null && dateB === null
    ? true
    : dayjs(dateA).isSame(dateB, "D");
};
