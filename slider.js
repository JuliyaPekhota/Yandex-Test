const buttons = document.querySelectorAll('[data-slide-direction]');
const cards = document.querySelector('.tournament_participants__cards');
const numberOfCards = document.querySelector('.tournament_participants__slider__number_of_cards');
let activeShare = 0;

const getNumberOfElementsToDisplay = () => {
  const activeSlide = cards.querySelector("[data-active-slide]");
  const displayArea = cards.getBoundingClientRect().width;
  const widthOfSlide = activeSlide.getBoundingClientRect().width;

  return Math.round(displayArea / widthOfSlide);
}

const setNumberOfCards = () => {
  numberOfCards.innerHTML = `${getNumberOfElementsToDisplay()}`;
}

addEventListener("resize", () => setNumberOfCards());

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const offset = button.dataset.slideDirection === "next" ? 1 : -1;
    clearInterval(intervalSlider);
    getActiveSlide(offset);
  });
});

const getActiveSlide = (offset) => {
    const activeSlide = cards.querySelector("[data-active-slide]");
    const numberOfElementsToDisplay = getNumberOfElementsToDisplay();
    const displayArea = cards.getBoundingClientRect().width;

    let newIndex = [...cards.children].indexOf(activeSlide) + (numberOfElementsToDisplay * offset);
    newIndex = newIndex < 0 ? 
        cards.children.length - numberOfElementsToDisplay
        : newIndex === cards.children.length 
        ? 0
        : [...cards.children].indexOf(activeSlide) + (numberOfElementsToDisplay * offset);

    cards.children[newIndex].dataset.activeSlide = true;
    delete activeSlide.dataset.activeSlide;

    const numberShares = (cards.children.length / numberOfElementsToDisplay) - 1;

    activeShare = offset > 0 ? 
        newIndex === 0 ? 
        0 
        : activeShare + 1
        : [...cards.children].indexOf(activeSlide) === 0 ? numberShares : activeShare - 1;

    let pixels = -displayArea * activeShare;
    cards.style.transform = `translateX(${pixels}px)`;
  };

setNumberOfCards();
const intervalSlider = setInterval(getActiveSlide.bind(null, 1), 4000);
