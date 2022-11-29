const GEOGRAPHIC_COORDINATE_ACCURACY = 5;
const COUNT_DISPLAY_MARKERS = 10;

const MockParameter = {
  Price: {
    MIN: 1000,
    MAX: 100000
  },
  Room: {
    MIN: 1,
    MAX: 100
  },
  Guest: {
    MIN: 1,
    MAX: 10
  },
  Latitude: {
    MIN: 35.65000,
    MAX: 35.70000
  },
  Longitude: {
    MIN: 139.70000,
    MAX: 139.80000
  },
  advertisementTitles: [
    'Маленькая квартирка рядом с парком',
    'Чёткая хата',
    'Небольшая лавочка в парке',
    'Уютное гнездышко для молодоженов',
    'Тихая квартирка недалеко от метро',
    'Стандартная квартира в центре',
    'Квартира студия в престижном районе',
    'Милое гнездышко для фанатов Анимэ',
    'Императорский дворец в центре Токио',
    'Загородный дом для спокойного отдыха',
    'Милейший чердачок',
    'Хостел «Для друзей»',
    'Отель-музей',
    'Небольшая бюджетная комната для студентов'
  ],
  offerTypes: [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel'
  ],
  checkInAndCheckOutTimes: [
    '12:00',
    '13:00',
    '14:00'
  ],
  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  advertisementDescriptions: [
    'Хейтеров просьба не беспокоить.',
    'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
    'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
    'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
    'Маленькая квартирка на чердаке. Для самых не требовательных.',
    'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
    'Отель для ценителей истории. Почуствуй себя героем из прошлого.',
    'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
    'Великолепная квартира-студия в центре Токио. Подходит как туристам, там и бизнесменам. Квартира полностью укомплектована и имеет свежий ремонт.',
    'Один из лучших хостелов для душевного общения. Ужинаем вместе и играем в «Мафию» по вечерам, вкусно готовим. Ежедневная уборка, бесплатный Wi-Fi, чистое постельное белье.',
    'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
  ],
  advertismentPhotos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ],
};

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

const getFeatures = () => MockParameter.features.filter(() => generateRandomInteger(0, 1));

const getPhotos = () => MockParameter.advertismentPhotos.filter(() => generateRandomInteger(0, 1));

const createAdvertisement = (_, index) => {
  const latitude = generateRandomFloat(MockParameter.Latitude.MIN, MockParameter.Latitude.MAX, GEOGRAPHIC_COORDINATE_ACCURACY);
  const longitude = generateRandomFloat(MockParameter.Longitude.MIN, MockParameter.Longitude.MAX, GEOGRAPHIC_COORDINATE_ACCURACY);
  return {
    author: {
      avatar: `img/avatars/user${index < 9 ? `0${index + 1}` : (index + 1)}.png`,
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
    offer: {
      title: MockParameter.advertisementTitles[generateRandomInteger(0, MockParameter.advertisementTitles.length - 1)],
      address: `${latitude}, ${longitude}`,
      price: generateRandomInteger(MockParameter.Price.MIN, MockParameter.Price.MAX),
      type: MockParameter.offerTypes[generateRandomInteger(0, MockParameter.offerTypes.length - 1)],
      rooms: generateRandomInteger(MockParameter.Room.MIN, MockParameter.Room.MAX),
      guests: generateRandomInteger(MockParameter.Guest.MIN, MockParameter.Guest.MAX),
      checkin: MockParameter.checkInAndCheckOutTimes[generateRandomInteger(0, MockParameter.checkInAndCheckOutTimes.length - 1)],
      checkout: MockParameter.checkInAndCheckOutTimes[generateRandomInteger(0, MockParameter.checkInAndCheckOutTimes.length - 1)],
      features: getFeatures(),
      description: MockParameter.advertisementDescriptions[generateRandomInteger(0, MockParameter.advertisementDescriptions.length - 1)],
      photos: getPhotos(),
    }
  };
};

const createMockAdvertisements = () => Array.from({length: COUNT_DISPLAY_MARKERS}, createAdvertisement);

createMockAdvertisements();
