'use strict';

const nav = document.querySelector('.nav-bar');

//*****************EVENT DELEGATION TECNIQUE*******************

document.querySelector('.nav-bar').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav-bar-items')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

document.querySelector('.logo').addEventListener('click', function (e) {
  e.preventDefault();
  document
    .getElementById('background-img')
    .scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.arrow-up').addEventListener('click', function (e) {
  e.preventDefault();
  document
    .getElementById('background-img')
    .scrollIntoView({ behavior: 'smooth' });
});

//***************FADE ANIMATION********************

const handleHover = function (e) {
  //check if target contains class for nav items
  if (e.target.classList.contains('nav-bar-items')) {
    const link = e.target;

    //check for siblings of the nav items
    const siblings = link
      .closest('.nav-bar')
      .querySelectorAll('.nav-bar-items'); // returns nodelist therefore iterable
    //logo
    const logo = link.closest('.nav-bar').querySelector('img');

    //for each sibling change the style
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//***************REVEAL SECTIONS**************************

//map elements
const allSections = document.querySelectorAll('.section');

//callback function for the intersection phase
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};

//intersection observer itself
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

//observe sections
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});

//*******************SLIDER***********************

const slider = function () {
  const btnRight = document.querySelector('.slider-btn-right');
  const btnLeft = document.querySelector('.slider-btn-left');

  //putting slides side by side
  const slides = document.querySelectorAll('.slide');
  const dotContainer = document.querySelector('.dots');

  const maxSlide = slides.length;
  let currentSlide = 0;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots_dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots_dot')
      .forEach((dot) => dot.classList.remove('dots_dot_active'));

    document
      .querySelector(`.dots_dot[data-slide="${slide}"]`)
      .classList.add('dots_dot_active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  // PREVIOUS SLIDE
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  //NEXT SLIDE
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots_dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
