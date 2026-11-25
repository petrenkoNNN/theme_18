const MIN_TIME = 2;
const MAX_TIME = 5;

const CAT_URLS = ['images/cat1.jpg', 'images/cat2.jpg', 'images/cat3.jpg'];
const DOG_URLS = ['images/dog1.jpg', 'images/dog2.jpg', 'images/dog3.jpg'];

const getRandomTime = () => Math.round(MIN_TIME + Math.random() * (MAX_TIME - MIN_TIME));

const createImagesRequest = (urls) => (onTimeCalculated) => new Promise((resolve) => {
  const time = getRandomTime();

  onTimeCalculated(time);
  setTimeout(() => resolve(urls), time * 1000);
});

const getCatImages = createImagesRequest(CAT_URLS);
const getDogImages = createImagesRequest(DOG_URLS);

const showSeconds = (timerEl, seconds) => {
  timerEl.textContent = `${seconds} с`;
};

const progress = (time, progressBarEl, timerEl) => {
  const duration = Math.max(time, MIN_TIME);
  let seconds = 0;

  showSeconds(timerEl, seconds);

  progressBarEl.style.transition = `transform ${duration}s linear`;
  progressBarEl.getBoundingClientRect();
  progressBarEl.style.transform = 'scaleX(1)';

  const intervalId = setInterval(() => showSeconds(timerEl, ++seconds), 1000);

  progressBarEl.addEventListener('transitionend', () => {
    clearInterval(intervalId);
    showSeconds(timerEl, duration);
  }, { once: true });
};

const createProgress = () => {
  const el = document.createElement('div');
  el.classList.add('progress');

  const bar = document.createElement('div');
  bar.classList.add('progress-bar');

  const timer = document.createElement('div');
  timer.classList.add('progress-timer');

  el.append(bar, timer);

  return { el, bar, timer };
};

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

const loadSection = (getImages) => {
  const section = document.createElement('div');
  section.classList.add('gallery-section');
  gallery.append(section);

  return getImages((time) => {
    const { el, bar, timer } = createProgress();

    section.append(el);
    progress(time, bar, timer);
  }).then((urls) => section.prepend(renderImages(urls)));
};

loadSection(getCatImages).then(() => loadSection(getDogImages));
