const MIN_DELAY = 2000;
const MAX_DELAY = 5000;

const CAT_URLS = ['images/cat1.jpg', 'images/cat2.jpg', 'images/cat3.jpg'];
const DOG_URLS = ['images/dog1.jpg', 'images/dog2.jpg', 'images/dog3.jpg'];

const getRandomDelay = () => Math.round(MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY));

const getCatImages = () => new Promise((resolve) => {
  setTimeout(() => resolve(CAT_URLS), getRandomDelay());
});

const getDogImages = () => new Promise((resolve) => {
  setTimeout(() => resolve(DOG_URLS), getRandomDelay());
});

const renderImages = (urls) => {
  const row = document.createElement('div');
  row.classList.add('gallery-row');

  const imageEls = urls.map((url) => {
    const img = document.createElement('img');
    img.classList.add('gallery-image');
    img.src = url;
    img.alt = '';

    return img;
  });

  row.append(...imageEls);

  return row;
};

const gallery = document.querySelector('.gallery');

getCatImages().then((urls) => gallery.append(renderImages(urls)));
getDogImages().then((urls) => gallery.append(renderImages(urls)));
