import '../scss/style.scss';

// СЛАЙДЕР С ЭТАПАМИ

const slidesContainer = document.querySelector('.upgrade__steps');
const slides = document.querySelectorAll('.upgrade__steps-wrapper');
const dots = document.querySelectorAll('.upgrade__btn-dot');
const prevBtn = document.querySelector('.upgrade__btn--prev');
const nextBtn = document.querySelector('.upgrade__btn--next');

let currentSlideSteps = 0;
const totalSlides = slides.length;

// Функция сдвига
function goToStepSlide(n) {
  currentSlideSteps = n;

  // Сдвигаем контейнер: минус, потому что влево
  slidesContainer.style.transform = `translateX(-${currentSlideSteps * 100}%)`;

  // Обновляем точки
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlideSteps].classList.add('active');

  // Обновляем кнопки
  updateStepsButtons();
}

// Обновление состояния кнопок
function updateStepsButtons() {
  if (currentSlideSteps === 0) {
    prevBtn.classList.add('disabled');
    prevBtn.disabled = true;
  } else {
    prevBtn.classList.remove('disabled');
    prevBtn.disabled = false;
  }

  if (currentSlideSteps === totalSlides - 1) {
    nextBtn.classList.add('disabled');
    nextBtn.disabled = true;
  } else {
    nextBtn.classList.remove('disabled');
    nextBtn.disabled = false;
  }
}

// Кнопки
prevBtn.addEventListener('click', () => {
  if (currentSlideSteps > 0) {
    goToStepSlide(currentSlideSteps - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSlideSteps < totalSlides - 1) {
    goToStepSlide(currentSlideSteps + 1);
  }
});

// Точки
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.dataset.slide);
    goToStepSlide(slideIndex);
  });
});

// Инициализация
updateStepsButtons();

// СЛАЙДЕР С УЧАСТНИКАМИ

const slidesContainerParticipants = document.querySelector('.participants__slider-wrapper');
const slidesParticipants = document.querySelectorAll('.participants__slide');
const prevBtnParticipants = document.querySelector('.participants__slider-btn--prev');
const nextBtnParticipants = document.querySelector('.participants__slider-btn--next');
const visibleNumElement = document.querySelector('.participants__slider-num--visible');
const totalNumElement = document.querySelector('.participants__slider-num--total');

let currentSlide = 0;
const GAP_SIZE = 20; // px

function getSlidesPerView() {
  const width = window.innerWidth;
  if (width >= 1080) return 3;
  if (width >= 768) return 2;
  return 1;
}

function getTotalSlides() {
  const perView = getSlidesPerView();
  return Math.ceil(slidesParticipants.length / perView) - 1;
}

function updateCounter() {
  const perView = getSlidesPerView();
  const totalSlides = slidesParticipants.length;
  
  // Рассчитываем текущий видимый слайд (для формата "3 / 6")
  const currentVisibleSlide = (currentSlide * perView) + perView;
  
  // Обновляем элементы счетчика
  visibleNumElement.textContent = Math.min(currentVisibleSlide, totalSlides);
  totalNumElement.textContent = ` / ${totalSlides}`;
}

function goToSlide(n) {
  const perView = getSlidesPerView();
  const containerWidth = slidesContainerParticipants.offsetWidth;
  const slideWidth = (containerWidth - (perView - 1) * GAP_SIZE) / perView;
  const pageWidth = perView * slideWidth + (perView - 1) * GAP_SIZE;
  const offset = n * pageWidth;

  slidesContainerParticipants.style.transform = `translateX(-${offset}px)`;
  currentSlide = n;
  
  updateButtons();
  updateCounter();
}

function updateButtons() {
  prevBtnParticipants.classList.toggle('disabled', currentSlide === 0);
  prevBtnParticipants.disabled = currentSlide === 0;
  
  nextBtnParticipants.classList.toggle('disabled', currentSlide >= getTotalSlides());
  nextBtnParticipants.disabled = currentSlide >= getTotalSlides();
}

prevBtnParticipants.addEventListener('click', () => {
  if (currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
});

nextBtnParticipants.addEventListener('click', () => {
  if (currentSlide < getTotalSlides()) {
    goToSlide(currentSlide + 1);
  }
});

window.addEventListener('resize', () => {
  const maxSlide = getTotalSlides();
  if (currentSlide > maxSlide) {
    currentSlide = maxSlide;
  }
  goToSlide(currentSlide);
});

// Инициализация
updateButtons();
updateCounter();
goToSlide(currentSlide);