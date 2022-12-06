import {getConstant} from './constant.js';

const {TIME_SHOW_ALERT, TIMEOUT_DELAY} = getConstant();

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

  return Math.round(Math.random() * (to - from) + from);
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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, TIME_SHOW_ALERT);
};

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {generateRandomInteger, generateRandomFloat, showAlert, debounce};
