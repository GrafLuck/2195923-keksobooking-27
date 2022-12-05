const Constant = {
  COUNT_DISPLAY_MARKERS: 10,
  GEOGRAPHIC_COORDINATE_ACCURACY: 5,
  TYPE_TO_NAME: {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель'
  },
  TYPE_TO_MIN_PRICE: {
    'bungalow': '0',
    'flat': '1000',
    'hotel': '3000',
    'house': '5000',
    'palace': '10000',
  },
  ROOMS_TO_GUESTS: {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  },
};

const getConstant = () => Constant;

export {getConstant};
