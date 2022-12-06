import { getConstant } from './constant.js';

const form = document.querySelector('.ad-form');
const avatar = form.querySelector('#avatar');
const previewAvatar = form.querySelector('.ad-form-header__preview img');
const image = form.querySelector('#images');
const imagePreview = form.querySelector('.ad-form__photo');

avatar.addEventListener('input', (evt) => {
  if (String(evt.target.files[0].type).startsWith('image/')) {
    previewAvatar.src = URL.createObjectURL(evt.target.files[0]);
    previewAvatar.alt = 'Аватар пользователя';
  } else {
    previewAvatar.src = '';
    previewAvatar.alt = '';
  }
});

image.addEventListener('input', (evt) => {
  imagePreview.innerHTML = '';
  const file = evt.target.files[0];
  if (file.type.startsWith('image/')) {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', URL.createObjectURL(file));
    imageElement.setAttribute('width', '100%');
    imagePreview.append(imageElement);
  }
});

const resetPreviewAvatar = () => {
  previewAvatar.src = getConstant().PREVIEW_AVATAR_URL;
  previewAvatar.alt = 'Аватар пользователя';
};

const resetPreviewPhoto = () => {
  if (imagePreview.firstChild) {
    imagePreview.removeChild(imagePreview.firstChild);
  }
};

export {resetPreviewAvatar, resetPreviewPhoto};
