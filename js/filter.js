import { getData } from './storage.js';
import { renderAdvertisementMarkers } from './map.js';
import { debounce } from './util.js';
import { getConstant } from './constant.js';

const filter = document.querySelector('.map__filters');

const typeFilter = filter.querySelector('#housing-type');
const typeFilterOptions = typeFilter.querySelectorAll('option');

const priceFilter = filter.querySelector('#housing-price');
const priceFilterOptions = priceFilter.querySelectorAll('option');

const roomFilter = filter.querySelector('#housing-rooms');
const roomsFilterOptions = roomFilter.querySelectorAll('option');

const guestFilter = filter.querySelector('#housing-guests');
const guestsFilterOptions = guestFilter.querySelectorAll('option');

const featureFilter = filter.querySelector('#housing-features');
const featureFilterCheckboxes = featureFilter.querySelectorAll('.map__checkbox');

const {HOUSING_PRICE_FILTER, COUNT_DISPLAY_MARKERS} = getConstant();

const filterByType = (advertisement) => {
  const typeFilterIndex = typeFilter.selectedIndex;
  const type = typeFilterOptions[typeFilterIndex].value;
  if (type === 'any') {
    return true;
  }
  return advertisement.offer.type === type;
};

const filterByPrice = (advertisement) => {
  const priceFilterIndex = priceFilter.selectedIndex;
  const price = priceFilterOptions[priceFilterIndex].value;
  if (price === 'any') {
    return true;
  }
  return advertisement.offer.price >= HOUSING_PRICE_FILTER[price][0] && advertisement.offer.price <= HOUSING_PRICE_FILTER[price][1];
};

const filterByRooms = (advertisement) => {
  const roomsFilterIndex = roomFilter.selectedIndex;
  const room = roomsFilterOptions[roomsFilterIndex].value;
  if (room === 'any') {
    return true;
  }
  return advertisement.offer.rooms === parseInt(room, 10);
};

const filterByGuest = (advertisement) => {
  const numberOfGuestsFilterIndex = guestFilter.selectedIndex;
  const guest = guestsFilterOptions[numberOfGuestsFilterIndex].value;
  if (guest === 'any') {
    return true;
  }
  return advertisement.offer.guests === parseInt(guest, 10);
};

const filterByFeature = (advertisement) => {
  const checkedFeatures = Array.from(featureFilterCheckboxes).filter((feature) => feature.checked === true);
  if (!checkedFeatures.length) {
    return true;
  }
  if (advertisement.offer.features === undefined) {
    return false;
  }

  return checkedFeatures.every((checkedFeature) => advertisement.offer.features.includes(checkedFeature.value));
};

const switchFiltersToInactiveState = () => {
  filter.classList.add('map__filters--disabled');
  typeFilter.setAttribute('disabled', '');
  priceFilter.setAttribute('disabled', '');
  roomFilter.setAttribute('disabled', '');
  guestFilter.setAttribute('disabled', '');
  featureFilter.setAttribute('disabled', '');
};

const switchFiltersToActiveState = () => {
  filter.classList.remove('map__filters--disabled');
  typeFilter.removeAttribute('disabled');
  priceFilter.removeAttribute('disabled');
  roomFilter.removeAttribute('disabled');
  guestFilter.removeAttribute('disabled');
  featureFilter.removeAttribute('disabled');
};

const onFilterChange = () => {
  const filterAdvertisements = [];
  const advertisements = getData();
  for (const advertisement of advertisements) {
    if (filterAdvertisements.length >= COUNT_DISPLAY_MARKERS) {
      break;
    }
    const isFilter = filterByType(advertisement) && filterByPrice(advertisement) && filterByRooms(advertisement) && filterByGuest(advertisement) && filterByFeature(advertisement);
    if (isFilter) {
      filterAdvertisements.push(advertisement);
    }
  }

  renderAdvertisementMarkers(filterAdvertisements);
};

const setFilterEventListeners = () => {
  filter.addEventListener('change', debounce(onFilterChange));
};

const resetFilters = () => {
  filter.reset();
  onFilterChange();
};

export {resetFilters, switchFiltersToInactiveState, switchFiltersToActiveState, setFilterEventListeners};
