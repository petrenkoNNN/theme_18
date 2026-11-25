const MIN_DELAY = 2000;
const MAX_DELAY = 5000;
const MIN_PROGRESS_TIME = 2;
const PROGRESS_TIME = 5;

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

const progressBar = document.querySelector('.progress-bar');
const progressTimer = document.querySelector('.progress-timer');

const showSeconds = (seconds) => {
  progressTimer.textContent = `${seconds} с`;
};

const progress = (time) => {
  const duration = Math.max(time, MIN_PROGRESS_TIME);
  let seconds = 0;

  showSeconds(seconds);

  progressBar.style.transition = 'none';
  progressBar.style.transform = 'scaleX(0)';
  progressBar.getBoundingClientRect();

  progressBar.style.transition = `transform ${duration}s linear`;
  progressBar.style.transform = 'scaleX(1)';

  const intervalId = setInterval(() => showSeconds(++seconds), 1000);

  progressBar.addEventListener('transitionend', () => {
    clearInterval(intervalId);
    showSeconds(Math.floor(duration));
  }, { once: true });
};

progress(PROGRESS_TIME);
