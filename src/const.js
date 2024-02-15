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

export { TYPE, OFFERS, CITY, FILTER, SORT };
