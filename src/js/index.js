import '../scss/style.scss';

const slidesContainer = document.querySelector('.upgrade__steps');
const slides = document.querySelectorAll('.upgrade__steps-wrapper');
const dots = document.querySelectorAll('.upgrade__btn-dot');
const prevBtn = document.querySelector('.upgrade__btn--prev');
const nextBtn = document.querySelector('.upgrade__btn--next');

let currentSlide = 0;
const totalSlides = slides.length;

// Функция сдвига
function goToSlide(n) {
  currentSlide = n;

  // Сдвигаем контейнер: минус, потому что влево
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Обновляем точки
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlide].classList.add('active');

  // Обновляем кнопки
  updateButtons();
}

// Обновление состояния кнопок
function updateButtons() {
  if (currentSlide === 0) {
    prevBtn.classList.add('disabled');
    prevBtn.disabled = true;
  } else {
    prevBtn.classList.remove('disabled');
    prevBtn.disabled = false;
  }

  if (currentSlide === totalSlides - 1) {
    nextBtn.classList.add('disabled');
    nextBtn.disabled = true;
  } else {
    nextBtn.classList.remove('disabled');
    nextBtn.disabled = false;
  }
}

// Кнопки
prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSlide < totalSlides - 1) {
    goToSlide(currentSlide + 1);
  }
});

// Точки
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.dataset.slide);
    goToSlide(slideIndex);
  });
});

// Инициализация
updateButtons();



