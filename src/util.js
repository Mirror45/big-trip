import dayjs from 'dayjs';

const getRandomInteger = (a = 1, b = 0) => {
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  return Math.round(Math.random() * (max - min) + min);
};

const getTime = (a, b) => {
  const time = dayjs('2000-01-01').add(dayjs(b).diff(a))

  if (dayjs(b).diff(a, 'day') > 0) return time.subtract(1, 'day').format("DD[D] HH[H] mm[M]");
  if (dayjs(b).diff(a, 'hour') > 0) return time.format('HH[H] mm[M]');
  return time.format('mm[M]');
};

const getFormat = (data) => {
  return {
    YMD: dayjs(data).format('YYYY-MM-DD'),
    MD: dayjs(data).format('MMM DD'),
    YMDHM: dayjs(data).format("YYYY-MM-DDTHH:mm"),
    HM: dayjs(data).format("HH:mm"),
    YMDHm: dayjs(data).format('YY/MM/DD HH:mm')
  }
}

export { getRandomInteger, getTime, getFormat };
