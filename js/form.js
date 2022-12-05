const form = document.querySelector('.ad-form');
const formFieldSets = form.querySelectorAll('fieldset');

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

export {switchFormToInactiveState, switchFormToActiveState};
