const getRandomInteger = (a = 1, b = 0) => {
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  return Math.round(Math.random() * (max - min) + min);
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export { getRandomInteger, updateItem };
