import dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getTime = (a, b) => {
  const time = dayjs('2000-01-01').add(dayjs(b).diff(a));

  if (dayjs(b).diff(a, 'day') > 0) return time.subtract(1, 'day').format('DD[D] HH[H] mm[M]');
  if (dayjs(b).diff(a, 'hour') > 0) return time.format('HH[H] mm[M]');
  return time.format('mm[M]');
};

const getFormat = (data) => {
  const format = (text) => dayjs(data).format(text);

  return {
    YMD: format('YYYY-MM-DD'),
    MD: format('MMM DD'),
    YMDHM: format('YYYY-MM-DDTHH:mm'),
    HM: format('HH:mm'),
    D: format('DD'),
  };
};

const getZeroSubStr = (number) => (number < 10) ? `0${number}` : `${number}`;

const gapToString = ({ days, hours, minutes }) => {
  if (days > 0) {
    return `${getZeroSubStr(days)}D ${getZeroSubStr(hours)}H ${getZeroSubStr(minutes)}M`;
  } else if (hours > 0) {
    return `${getZeroSubStr(hours)}H ${getZeroSubStr(minutes)}M`;
  } else {
    return `${getZeroSubStr(minutes)}M`;
  }
};

const getDiff = (start, end) => {
  return dayjs(end).diff(dayjs(start));
};

const diffToString = (diff) => {
  return gapToString(dayjs.duration(diff).$d);
};

const sortDay = (a, b) => {
  return dayjs(a.startTime).diff(b.startTime);
};

const sortTime = (a, b) => {
  return dayjs(b.endTime).diff(b.startTime) - dayjs(a.endTime).diff(a.startTime);
};

const sortPrice = (a, b) => {
  return b.price - a.price;
};

const filterFuture = ({ startTime }) => {
  return dayjs().diff(startTime) < 0;
};

const filterPast = ({ endTime }) => {
  return dayjs().diff(endTime) >= 0;
};

const calculateMoney = (events) => {
  const money = {};
  events.forEach(({ type, price }) => {
    money[type] = money[type] !== undefined ? money[type] + price : price;
  });
  return new Map(Object.entries(money).sort((a, b) => b[1] - a[1]));
};

const calculateType = (event) => {
  const types = {};
  event.forEach(({ type }) => {
    types[type] = types[type] !== undefined ? types[type] + 1 : 1;
  });
  return new Map(Object.entries(types).sort((a, b) => b[1] - a[1]));
};

const calculateTime = (event) => {
  const time = {};
  event.forEach(({ type, startTime, endTime }) => {
    time[type] = time[type] !== undefined ? time[type] + getDiff(startTime, endTime) : getDiff(startTime, endTime);
  });
  return new Map(Object.entries(time).sort((a, b) => b[1] - a[1]));
};

export { getTime, getFormat, sortDay, sortTime, sortPrice, filterFuture, filterPast, calculateMoney, calculateType, calculateTime, diffToString };
