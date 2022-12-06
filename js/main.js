import { initializeMap, renderAdvertisementMarkers } from './map.js';
import { switchFormToInactiveState, setFormEventListeners } from './form.js';
import { switchFiltersToInactiveState, switchFiltersToActiveState, setFilterEventListeners } from './filter.js';
import { showAlert } from './util.js';
import { getData } from './network.js';
import { setData } from './storage.js';

const onSuccessGetData = (data) => {
  setData(data);
  renderAdvertisementMarkers(data);
  switchFiltersToActiveState();
  setFilterEventListeners();
};

switchFiltersToInactiveState();
switchFormToInactiveState();

initializeMap();
getData(onSuccessGetData, showAlert);
setFormEventListeners();
