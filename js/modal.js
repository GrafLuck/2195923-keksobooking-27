const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const onSuccessModalEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    onSuccessModalButtonClick();
  }
};

const onSuccessWindowClick = () => {
  onSuccessModalButtonClick();
};

function onSuccessModalButtonClick() {
  const successModal = document.querySelector('.success');
  successModal.remove();
  document.removeEventListener('keydown', onSuccessModalEscKeydown);
  document.removeEventListener('click', onSuccessWindowClick);
}

const onErrorModalEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    onErrorModalButtonClick();
  }
};

const onErrorWindowClick = () => {
  onErrorModalButtonClick();
};

function onErrorModalButtonClick() {
  const errorModal = document.querySelector('.error');
  const errorModalButton = errorModal.querySelector('.error__button');
  errorModalButton.removeEventListener('click', onErrorModalButtonClick);
  errorModal.remove();
  document.removeEventListener('keydown', onErrorModalEscKeydown);
  document.removeEventListener('click', onErrorWindowClick);
}

const openSuccessModal = () => {
  const successModal = successModalTemplate.cloneNode(true);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
  document.addEventListener('click', onSuccessWindowClick);
  body.append(successModal);
};

const openErrorModal = () => {
  const errorModal = errorModalTemplate.cloneNode(true);
  const errorModalButton = errorModal.querySelector('.error__button');
  errorModalButton.addEventListener('click', onErrorModalButtonClick);
  document.addEventListener('keydown', onErrorModalEscKeydown);
  document.addEventListener('click', onErrorWindowClick);
  body.append(errorModal);
};

export {openSuccessModal, openErrorModal};
