const upButton = document.querySelector(".up");
const downButton = document.querySelector(".down");
const imageContainer = document.querySelector(".imageContainer");
const audio = document.querySelector("audio");

let direction = "";
let sliderIndex = 0;

const elevatorLoop = () => {
  const intervalId = setInterval(() => {
    if (direction === "down" && sliderIndex < 2) {
      audio.currentTime = 0;
      downButton.click();
    } else if (direction === "up" && sliderIndex > 0) {
      audio.currentTime = 0;
      upButton.click();
    } else {
      direction = "";
      clearInterval(intervalId);
    }
  }, 5000);
};

upButton.addEventListener("click", (e) => {
  if (e.isTrusted) {
    if (!direction) {
      direction = "up";
    } else if (direction === "up") {
      direction = "";
    }
  }
  slide(direction);
});

downButton.addEventListener("click", (e) => {
  if (e.isTrusted) {
    if (!direction) {
      direction = "down";
    } else if (direction === "down") {
      direction = "";
    }
  }
  slide(direction);
});

function slide(direction) {
  if (direction === "down") {
    if (sliderIndex < 2) {
      sliderIndex++;
      if (sliderIndex === 2) {
        downButton.classList.add("disabled");
      } else {
        upButton.classList.remove("disabled");
      }
      audio.play();
      imageContainer.style.transform = `translateY(${sliderIndex * 10}rem)`;

      elevatorLoop();
    }
  } else if (direction === "up") {
    if (sliderIndex > 0) {
      sliderIndex--;
      if (sliderIndex === 0) {
        upButton.classList.add("disabled");
      } else {
        downButton.classList.remove("disabled");
      }
      audio.play();
      imageContainer.style.transform = `translateY(${sliderIndex * 10}rem)`;
      elevatorLoop();
    }
  }
}
