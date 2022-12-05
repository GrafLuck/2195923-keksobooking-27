import { createMockAdvertisements } from './mock-data.js';
import { getCardAdvertisement } from './card-advertisement.js';

const mapCanvas = document.querySelector('#map-canvas');

const advertisements = createMockAdvertisements();
mapCanvas.append(getCardAdvertisement(advertisements[1]));
