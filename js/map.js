import { setAddressInForm, switchFormToActiveState } from './form.js';
import { getCardAdvertisement } from './card-advertisement.js';
import { getConstant } from './constant.js';

const {GEOGRAPHIC_COORDINATE_ACCURACY, DEFAULT_LATITUDE, DEFAULT_LONGITUDE, ICON, COUNT_DISPLAY_MARKERS, MAP_LAYER, MAP_ATTRIBUTION} = getConstant();
const {ADVERTISIMENT_ICON, MAIN_PIN_ICON} = ICON;

let map;
let markerGroup;
let mainMarker;

const DEFAULT_COORDINATE = {
  lat: DEFAULT_LATITUDE,
  lng: DEFAULT_LONGITUDE
};

const createMarkerGroup = () => L.layerGroup().addTo(map);

const createMarker = (location, typeIcon, isDraggable) => {
  const {lat, lng} = location;
  return L.marker(
    {
      lat,
      lng,
    },
    {
      icon: typeIcon,
      draggable: isDraggable,
    },
  );
};

const createMainMarker = () => createMarker(DEFAULT_COORDINATE, MAIN_PIN_ICON, true).addTo(map);

const createAdvertisementMarker = (advertisement) => createMarker(advertisement.location, ADVERTISIMENT_ICON, false).addTo(markerGroup).bindPopup(getCardAdvertisement(advertisement));

const renderAdvertisementMarkers = (advertisements) => {
  markerGroup.clearLayers();
  advertisements.slice(0, COUNT_DISPLAY_MARKERS).forEach(createAdvertisementMarker);
};

const setMainMarkerInCoordinate = (coordinate = DEFAULT_COORDINATE) => {
  mainMarker.setLatLng(coordinate);
  setAddressInForm(coordinate);
};

const onLoadMap = () => {
  setAddressInForm(DEFAULT_COORDINATE);
  switchFormToActiveState();
};

const onMarkerMoveEnd = (evt) => {
  const coordinate = evt.target.getLatLng();
  setAddressInForm({
    lat: coordinate.lat.toFixed(GEOGRAPHIC_COORDINATE_ACCURACY),
    lng: coordinate.lng.toFixed(GEOGRAPHIC_COORDINATE_ACCURACY)
  });
};

const createMap = () => {
  map = L.map('map-canvas').on('load', onLoadMap).setView(DEFAULT_COORDINATE, 10);
  L.tileLayer(MAP_LAYER, { MAP_ATTRIBUTION }).addTo(map);
};

const initializeMap = () => {
  createMap();
  markerGroup = createMarkerGroup();
  mainMarker = createMainMarker();
  mainMarker.on('moveend', onMarkerMoveEnd);
};

const closePopup = () => {
  map.closePopup();
};

export {initializeMap, setMainMarkerInCoordinate, closePopup, renderAdvertisementMarkers};
