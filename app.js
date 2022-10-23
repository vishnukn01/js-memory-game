const flipBox = document.querySelectorAll(".flip-box");
const animalImage = document.querySelectorAll(".animalImage");
const scoreContainer = document.querySelector("#score-value");
const failedAttemptsContainer = document.querySelector(
  "#failed-attempts-value"
);
const resetBtn = document.querySelector("#resetBtn");

let score = 0;
let failedAttempts = 0;

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

/** On load,
 * Shuffle images
 */
let images = ["elephant", "monkey", "frog"];
let imagesArr = [];
images.forEach((img) => {
  imagesArr.push(
    { name: img, alt: `${img}-1` },
    { name: img, alt: `${img}-2` }
  );
});
let shuffledImages = shuffle(imagesArr);

/* Insert images randomly */
for (let i = 0; i < animalImage.length; i++) {
  animalImage[i].setAttribute("src", `/images/${shuffledImages[i].name}.jpeg`);
  animalImage[i].setAttribute("alt", `${shuffledImages[i].alt}`);
}

/* On click of each div */
let clickedArray = [];
flipBox.forEach((fb) => {
  fb.addEventListener("click", (e) => {
    // Flip over
    fb.querySelector(".flip-box-inner").style.transform = "rotateY(180deg)";

    // Update clicked array
    let clickedImage = {
      name: fb.querySelector(".animalImage").getAttribute("src"),
      alt: fb.querySelector(".animalImage").getAttribute("alt"),
    };
    clickedArray.push(clickedImage);

    // Disable click on clicked image
    fb.style.pointerEvents = "none";

    // Perform checks
    if (clickedArray.length === 2) {
      performChecks(fb);
    }
  });
});

function performChecks() {
  if (clickedArray[0].name === clickedArray[1].name) {
    score = score + 1;
    // Update score in DOM
    scoreContainer.innerText = score;
  } else {
    failedAttempts = failedAttempts + 1;
    // Update in DOM
    failedAttemptsContainer.innerText = failedAttempts;
    // Flip images back
    flipBack();
  }
  clickedArray = [];
}

function flipBack() {
  clickedArray.forEach((i) => {
    let el = document.querySelector(`[alt='${i.alt}']`).parentElement
      .parentElement.parentElement;
    console.log("el", el);
    setTimeout(() => {
      el.querySelector(".flip-box-inner").style.transform = "rotateY(0deg)";

      // Make it clickable again
      el.style.pointerEvents = "auto";
    }, 500);
  });
}

resetBtn.addEventListener("click", () => {
  window.location.href = "/";
});
