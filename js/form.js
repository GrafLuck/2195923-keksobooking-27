import { sendData } from './network.js';
import { resetFilters } from './filter.js';
import { setMainMarkerInCoordinate, closePopup } from './map.js';
import { openSuccessModal, openErrorModal} from './modal.js';
import { getConstant } from './constant.js';
import { resetPreviewAvatar, resetPreviewPhoto } from './image.js';

const { TYPE_TO_MIN_PRICE, ROOMS_TO_GUESTS } = getConstant();

const form = document.querySelector('.ad-form');
const formFieldSets = form.querySelectorAll('fieldset');
const address = form.querySelector('#address');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const priceSlider = form.querySelector('.ad-form__slider');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const room = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');

const createPristine = () => new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

let pristine = createPristine();

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(),
    from: (value) => +value
  }
});

priceSlider.noUiSlider.on('slide', () => {
  price.value = priceSlider.noUiSlider.get();
});

const switchFormToInactiveState = () => {
  form.classList.add('ad-form--disabled');
  formFieldSets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', '');
  });
};

const switchFormToActiveState = () => {
  form.classList.remove('ad-form--disabled');
  formFieldSets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', '');
  });
};

pristine.addValidator(capacity, (value) => {
  const isNumberOfRoomsMatchNumberOfGuests = ROOMS_TO_GUESTS[room.value].find((guest) => guest === value);
  if (isNumberOfRoomsMatchNumberOfGuests) {
    return true;
  }
  return false;
}, 'Число гостей неправильное', 1, false);

const resetForm = () => {
  form.reset();
  priceSlider.noUiSlider.updateOptions({
    start: 0,
  });
  resetPreviewAvatar();
  resetPreviewPhoto();
  pristine.reset();
};

const switchPageInDefaultState = () => {
  resetForm();
  resetFilters();
  closePopup();
  setMainMarkerInCoordinate();
};

const onSuccessSendData = () => {
  submitButton.removeAttribute('disabled');
  switchPageInDefaultState();
  openSuccessModal();
};

const onErrorSendData = () => {
  submitButton.removeAttribute('disabled');
  openErrorModal();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    submitButton.setAttribute('disabled', '');
    sendData(onSuccessSendData, onErrorSendData, new FormData(evt.target));
  }
};

const onResetSubmit = (evt) => {
  evt.preventDefault();
  switchPageInDefaultState();
};

const onTypeSelectChange = (evt) => {
  price.setAttribute('placeholder', TYPE_TO_MIN_PRICE[evt.target.value]);
  price.setAttribute('min', TYPE_TO_MIN_PRICE[evt.target.value]);
  price.setAttribute('data-pristine-min-message', `Минимальная цена ${TYPE_TO_MIN_PRICE[evt.target.value]}`);
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: parseInt(TYPE_TO_MIN_PRICE[evt.target.value], 10),
      max: 100000,
    },
    start: TYPE_TO_MIN_PRICE[evt.target.value],
    step: 1,
  });
  pristine.destroy(); //уничтожаем и создаем, чтобы pristine обновила установленные в html атрибуты
  pristine = createPristine();
  pristine.validate(price);
};

const onTimeInSelectChange = (evt) => {
  const timeOutOptions = timeout.querySelectorAll('option');
  for (const option of timeOutOptions) {
    if (option.value === evt.target.value) {
      option.selected = true;
      break;
    }
  }
};

const onTimeOutSelectChange = (evt) => {
  const timeInOptions = timein.querySelectorAll('option');
  for (const option of timeInOptions) {
    if (option.value === evt.target.value) {
      option.selected = true;
      break;
    }
  }
};

const onRoomNumberChange = () => {
  pristine.validate(capacity);
};

const setFormEventListeners = () => {
  form.addEventListener('submit', onFormSubmit);
  type.addEventListener('change', onTypeSelectChange);
  room.addEventListener('change', onRoomNumberChange);
  timein.addEventListener('change', onTimeInSelectChange);
  timeout.addEventListener('change', onTimeOutSelectChange);
  resetButton.addEventListener('click', onResetSubmit);
};

const setAddressInForm = (coordinate) => {
  address.value = `${coordinate.lat}, ${coordinate.lng}`;
};

export { switchFormToActiveState, switchFormToInactiveState, setAddressInForm, setFormEventListeners };
