const Constant = {
  SERVER_URL: 'https://27.javascript.pages.academy/keksobooking',
  COUNT_DISPLAY_MARKERS: 10,
  GEOGRAPHIC_COORDINATE_ACCURACY: 5,
  MAP_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  MAP_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  TIME_SHOW_ALERT: 4000,
  TIMEOUT_DELAY: 500,
  DEFAULT_LATITUDE: 35.68951,
  DEFAULT_LONGITUDE: 139.69171,
  ICON: {
    MAIN_PIN_ICON: L.icon({
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    }),
    ADVERTISIMENT_ICON: L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    }),
  },
  ROOMS_TO_GUESTS: {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  },
  TYPE_TO_MIN_PRICE: {
    'bungalow': '0',
    'flat': '1000',
    'hotel': '3000',
    'house': '5000',
    'palace': '10000',
  },
  HOUSING_PRICE_FILTER: {
    'any': [0, Infinity],
    'middle': [10000, 50000],
    'low': [0, 9999],
    'high': [50001, Infinity],
  },
  TYPE_TO_NAME: {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель'
  },
  PREVIEW_AVATAR_URL: 'img/muffin-grey.svg',
};

const getConstant = () => Constant;

export {getConstant};
