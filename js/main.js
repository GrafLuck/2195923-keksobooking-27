const generateRandomInteger = (from, to) => {
  if (typeof from !== 'number' || typeof to !== 'number') {
    return NaN;
  }

  if (from < 0 || to < 0) {
    return NaN;
  }

  if (from === to) {
    return from;
  }

  if (to < from) {
    [from, to] = [to, from];
  }

  return Math.round(Math.random() * (to - from) + to);
};

const generateRandomFloat = (from, to, precision) => {
  if (typeof from !== 'number' || typeof to !== 'number' || typeof precision !== 'number') {
    return NaN;
  }

  if (from < 0 || to < 0 || precision < 0) {
    return NaN;
  }

  if (from === to) {
    return from;
  }

  if (to < from) {
    [from, to] = [to, from];
  }

  const powerPrecision = Math.pow(10, precision);
  return +(Math.round((Math.random() * (to - from) + from) * powerPrecision) / powerPrecision).toFixed(precision);
};

generateRandomInteger(5, 15);
generateRandomFloat(1.2, 6.7, 5);
