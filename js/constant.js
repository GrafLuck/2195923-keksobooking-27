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
};

const getConstant = () => Constant;

export {getConstant};
