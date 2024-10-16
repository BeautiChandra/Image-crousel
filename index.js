const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const sliderCntrl = function () {
  let currentSlide = 0;

  // Functions

  const activeDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const updateSlide = function (Slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - Slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    updateSlide(currentSlide);
    activeDots(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide--;
    }
    updateSlide(currentSlide);
    activeDots(currentSlide);
  };

  // init function
  const init = function () {
    // createDots();
    updateSlide(0);
    activeDots(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") previousSlide();
    e.key === "ArrowRight" && nextSlide();
  });
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      let { slide } = e.target.dataset;
      slide = parseInt(slide, 10);
      currentSlide = slide;
      updateSlide(currentSlide);
      activeDots(currentSlide);
    }
  });
};
const activeCntrl = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  sliderCntrl();
};

const options = {
  root: null,
  threshold: 0,
};
const slideObserver = new IntersectionObserver(activeCntrl, options);
slideObserver.observe(document.querySelector(".slider"));
