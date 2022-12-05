import { getConstant } from './constant.js';

const { TYPE_TO_MIN_PRICE, ROOMS_TO_GUESTS } = getConstant();

const form = document.querySelector('.ad-form');
const formFieldSets = form.querySelectorAll('fieldset');
const avatar = form.querySelector('#avatar');
const title = form.querySelector('#title');
const address = form.querySelector('#address');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const priceSlider = form.querySelector('.ad-form__slider');
const slider = form.querySelector('.ad-form__slider');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const room = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const features = form.querySelector('.features');
const description = form.querySelector('#description');
const image = form.querySelector('#images');

const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');

const createPristine = () => new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

let pristine = createPristine();

pristine.addValidator(capacity, (value) => {
  const isNumberOfRoomsMatchNumberOfGuests = ROOMS_TO_GUESTS[room.value].find((guest) => guest === value);
  if (isNumberOfRoomsMatchNumberOfGuests) {
    return true;
  }
  return false;
}, 'Число гостей неправильное', 1, false);

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

const onTypeSelectChange = (evt) => {
  price.setAttribute('placeholder', TYPE_TO_MIN_PRICE[evt.target.value]);
  price.setAttribute('min', TYPE_TO_MIN_PRICE[evt.target.value]);
  price.setAttribute('data-pristine-min-message', `Минимальная цена ${TYPE_TO_MIN_PRICE[evt.target.value]}`);

  pristine.destroy();
  pristine = createPristine();
  pristine.validate(price);
};

const onRoomNumberChange = () => {
  pristine.validate(capacity);
};

const onFormSubmit = () => {
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Данные валидны');
  } else {
    console.log('Данные невалидны');
  }
};

const setFormEventListeners = () => {
  form.addEventListener('submit', onFormSubmit);
  type.addEventListener('change', onTypeSelectChange);
  room.addEventListener('change', onRoomNumberChange);
};

export {switchFormToInactiveState, switchFormToActiveState, setFormEventListeners};
