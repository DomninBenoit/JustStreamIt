const carousels = document.querySelectorAll(".carousel");
const prevBtns = document.querySelectorAll(".prev-btn");
const nextBtns = document.querySelectorAll(".next-btn");

carousels.forEach((carousel, index) => {
  let position = 0;

  function updatePosition() {
    carousel.style.transform = `translateX(${position}px)`;
  }

  prevBtns[index].addEventListener("click", () => {
    const itemWidth = carousel.querySelector(".carousel-item").offsetWidth;
    if (position === 0) {
      position -= itemWidth * 3;
      updatePosition();
    } else {
      position += itemWidth;
      updatePosition();
    }
  });

  nextBtns[index].addEventListener("click", () => {
    const itemWidth = carousel.querySelector(".carousel-item").offsetWidth;
    if (position === -itemWidth * 3) {
      position += itemWidth * 3;
      updatePosition();
    } else {
      position -= itemWidth;
      updatePosition();
    }
  });
});
