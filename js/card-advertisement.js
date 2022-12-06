import { getConstant } from './constant.js';

const TypeToName = getConstant().TYPE_TO_NAME;

const advertisementTemplate = document.querySelector('#card').content.querySelector('.popup');

const addFeaturesInCard = (featureContainer, features) => {
  if (features === undefined) {
    featureContainer.classList.add('hidden');
    return;
  }

  const featureElements = Array.from(featureContainer.querySelectorAll('.popup__feature'));
  const featureClasses = Array.from(features, (feature) => `popup__feature--${feature}`);

  featureElements.forEach((featureElement) => {
    const featureElementClass = featureElement.classList[1];
    if (!featureClasses.includes(featureElementClass)) {
      featureElement.remove();
    }
  });
};

const addDescriptionInCard = (descriptionElement, description) => {
  if (description === undefined) {
    descriptionElement.classList.add('hidden');
    return;
  }
  descriptionElement.textContent = description;
};

const addPhotosInCard = (photoContainer, photos) => {
  if (photos === undefined) {
    photoContainer.classList.add('hidden');
    return;
  }
  const photoElement = photoContainer.querySelector('.popup__photo');
  photos.forEach((photoSrc) => {
    const photo = photoElement.cloneNode(true);
    photo.src = photoSrc;
    photoContainer.append(photo);
  });
  photoElement.remove();
};

const addAvatarInCard = (avatarElement, avatar) => {
  if (avatar.src === undefined) {
    avatarElement.classList.add('hidden');
    return;
  }
  avatarElement.src = avatar;
};

const getCardAdvertisement = (advertisement) => {
  const {author, offer} = advertisement;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;

  const advertisementElement = advertisementTemplate.cloneNode(true);
  const titleElement = advertisementElement.querySelector('.popup__title');
  const addressElement = advertisementElement.querySelector('.popup__text--address');
  const priceElement = advertisementElement.querySelector('.popup__text--price');
  const typeElement = advertisementElement.querySelector('.popup__type');
  const capacityElement = advertisementElement.querySelector('.popup__text--capacity');
  const timeElement = advertisementElement.querySelector('.popup__text--time');
  const featureContainer = advertisementElement.querySelector('.popup__features');
  const descriptionElement = advertisementElement.querySelector('.popup__description');
  const photoContainer = advertisementElement.querySelector('.popup__photos');
  const avatarElement = advertisementElement.querySelector('.popup__avatar');

  titleElement.textContent = title;
  addressElement.textContent = address;
  priceElement.textContent = `${price} ₽/ночь`;
  typeElement.textContent = TypeToName[type];
  capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  addFeaturesInCard(featureContainer, features);
  addDescriptionInCard(descriptionElement, description);
  addPhotosInCard(photoContainer, photos);
  addAvatarInCard(avatarElement, author.avatar);
  return advertisementElement;
};

export {getCardAdvertisement};
