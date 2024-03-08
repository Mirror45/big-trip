import dayjs from 'dayjs';

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

const getDiff = ({ startTime, endTime }) => {
  return dayjs(endTime).diff(startTime);
};

const diffToString = (diff) => {
  const time = dayjs('2000-01-01').add(diff);

  if (time.date() > 1) return time.subtract(1, 'day').format('DD[D] HH[H] mm[M]');
  if (time.hour() > 0) return time.format('HH[H] mm[M]');
  return time.format('mm[M]');
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

const calculateType = (events) => {
  const types = {};
  events.forEach(({ type }) => {
    types[type] = types[type] !== undefined ? types[type] + 1 : 1;
  });
  return new Map(Object.entries(types).sort((a, b) => b[1] - a[1]));
};

const calculateTime = (events) => {
  const time = {};
  events.forEach((item) => {
    const { type } = item;
    return time[type] = time[type] !== undefined ? time[type] + getDiff(item) : getDiff(item);
  });
  return new Map(Object.entries(time).sort((a, b) => b[1] - a[1]));
};

export { getTime, getFormat, sortDay, sortTime, sortPrice, filterFuture, filterPast, calculateMoney, calculateType, calculateTime, diffToString };
