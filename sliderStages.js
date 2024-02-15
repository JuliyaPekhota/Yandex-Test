const stagesButtons = document.querySelectorAll('[data-stages-slide-direction]');
const slides = document.querySelector('.stages__grid');
const circles = document.querySelector(".stages__circles");
let allActiveShares = 5;
let count = 0;

stagesButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const offset = button.dataset.stagesSlideDirection === "next" ? 1 : -1;
    getActiveStagesSlide(offset);
  });
});

const addCircles = (index = 0) => {
  const div = document.createElement("div");
  const activeCircle = circles.querySelector("[data-active-slide-circle]");

  if (circles.childElementCount === 1) {
    for (i=1; i <= allActiveShares - 1; i++) {
      circles.append(div.cloneNode());
    }
  } else {
    circles.children[index].dataset.activeSlideCircle = true;
    delete activeCircle.dataset.activeSlideCircle;
  }
}

const changingButtonStatus = (index = 0) => {
  const prevBtn = document.querySelector('.stages__prev');
  const nextBtn = document.querySelector('.stages__next');

  if (index === 0) {
    prevBtn.classList.add('disabled');
  } else if (index === allActiveShares - 1) {
    nextBtn.classList.add('disabled');
  } else {
    stagesButtons.forEach(button => {
      button.classList.remove('disabled');
    });
  }
}

const getActiveStagesSlide = (offset) => {
  const activeSlide = slides.querySelector("[data-stages-active-slide]");
  const displayArea = slides.getBoundingClientRect().width;
  let indxActiveSlide = [...slides.children].indexOf(activeSlide);

  if ((offset > 0) && (indxActiveSlide === 0 || indxActiveSlide === 3)) {
   indxActiveSlide++;
  }

  if ((offset < 0) && (indxActiveSlide === 2 || indxActiveSlide === 5)) {
    indxActiveSlide--;
  }

  let newIndex = indxActiveSlide + offset;
  slides.children[newIndex].dataset.stagesActiveSlide = true;
  delete activeSlide.dataset.stagesActiveSlide;
  
  count = offset > 0 ? count + 1 : count - 1;
  changingButtonStatus(count);
  addCircles(count);

  let pixels = -displayArea * count;
  slides.style.transform = `translateX(${pixels}px)`;
};

addCircles();