const getRandomInteger = (a = 1, b = 0) => {
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  return Math.round(Math.random() * (max - min) + min);
};

export { getRandomInteger };
