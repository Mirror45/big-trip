const TYPE = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFERS = [
  { title: 'Add luggage', price: 30 },
  { title: 'Switch to comfort class', price: 100 },
  { title: 'Add meal', price: 15 },
  { title: 'Choose seats', price: 5 },
  { title: 'Travel by train', price: 40 },
];

const CITY = ['Amsterdam', 'Geneva', 'Chamonix'];

const FILTER = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SORT = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const MENU = {
  TABLE: 'Table',
  STATS: 'Stats',
};

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

const DESCRIPTION = 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.';

const PICTURES = new Array(5).fill().map((_, i) => ({ src: `img/photos/${i + 1}.jpg`, description: 'Event photo' }));

export { TYPE, OFFERS, CITY, FILTER, SORT, UserAction, UpdateType, MENU, DESCRIPTION, PICTURES, State };
