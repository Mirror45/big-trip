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

const sortDay = (a, b) => {
  return dayjs(a.startTime).diff(b.startTime);
};

const sortTime = (a, b) => {
  return dayjs(b.endTime).diff(b.startTime) - dayjs(a.endTime).diff(a.startTime);
};

const sortPrice = (a, b) => {
  return b.totalPrice - a.totalPrice;
};

const filterFuture = ({ startTime }) => {
  return dayjs().diff(startTime) < 0;
};

const filterPast = ({ endTime }) => {
  return dayjs().diff(endTime) >= 0;
};

export { getTime, getFormat, sortDay, sortTime, sortPrice, filterFuture, filterPast };
