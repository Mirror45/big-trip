import dayjs from 'dayjs';
import { getRandomInteger } from '../util.js';
import { TYPE, OFFERS, CITY } from '../const.js';

const generateDate = () => {
  const start = dayjs().add(getRandomInteger(-3, 3), 'day').toDate();
  return { start, end: dayjs(start).add(getRandomInteger(180), 'minute').toDate() };
};

const getRandomOffer = () => {
  return OFFERS.filter(() => getRandomInteger());
};

const getRandomType = () => {
  return TYPE[getRandomInteger(TYPE.length - 1)];
};

const getRandomCity = () => {
  return CITY[getRandomInteger(CITY.length - 1)];
};

const generateEvent = () => {
  const date = generateDate();
  const offers = getRandomOffer();

  return {
    totalPrice: getRandomInteger(300) + offers.reduce((a, { price }) => a + price, 0),
    startTime: date.start,
    endTime: date.end,
    destination: {
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem ullam reprehenderit rerum iste maiores? Et quis neque provident repudiandae quo. Reprehenderit unde eum veniam quasi deserunt sapiente possimus blanditiis laudantium.',
      name: getRandomCity(),
      pictures: [
        {
          src: `http://picsum.photos/300/200?r=${Math.random()}`,
          description: 'Event photo',
        },
      ],
    },
    isFavorite: !getRandomInteger(),
    offers,
    type: getRandomType(),
  };
};

export { generateEvent };
