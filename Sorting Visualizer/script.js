// Get the container where bars will be displayed
let main_box = document.getElementById("box");

// Create a div to display current iteration (i and j values)
let iteration = document.createElement("div");

// Controls whether sorting loops should run or stop
let stoploop = false;

// Prevents running more than one sort at a time
let onlyOneSort = true;

// Function to generate a random array and create visual bars
function genrateArr() {
  stoploop = true;         // Stop any ongoing sorting
  onlyOneSort = true;      // Allow new sort to begin

  main_box.innerHTML = "";     // Clear existing bars
  iteration.innerHTML = "";    // Clear iteration label

  let maxBar = parseInt(sliderVal.textContent); // Number of bars from slider

  for (let i = 0; i < maxBar; i++) {
    let val = Math.ceil(Math.random() * 100); // Random value between 1 and 100

    let bar = document.createElement("div");
    bar.classList.add("arr_box");

    let barWidth = 2570 / maxBar;             // max width of main box =2570 
    bar.style.width = `${barWidth}px`;
    bar.style.height = `${val * 11}px`;
    bar.style.transform = `translateX(${i * barWidth}px)`;//place bars in main_box according to thier width
    bar.innerText = val;

    main_box.appendChild(bar);
  }

  // Add the iteration box to track i and j during sorting
  iteration.classList.add("iter_box");
  iteration.textContent = " i=0, j=0 ";
  main_box.prepend(iteration);//iteration boc should be at top
}

// Delay for visulaization
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Bubble Sort Algorithm
async function bubbleSort() {
  if (!onlyOneSort) return;
  onlyOneSort = false;
  stoploop = false;

  let bars = main_box.children;//all the bars (**1st child will be iteration_box->no need to sort)
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      if (stoploop) return;//to stop loop manually
      if (bars[j].classList.contains("iter_box")) continue;

      // Highlight bars being compared
      bars[j].classList.add("red_bar");
      bars[j + 1].classList.add("red_bar");

      let val1 = parseInt(bars[j].innerText);
      let val2 = parseInt(bars[j + 1].innerText);

      iteration.textContent = `i=${i},j=${j}`;
      await wait(40);

      // Swap values if needed
      if (val1 > val2) {
        let tempHeight = bars[j].style.height;
        let tempVal = bars[j].innerText;

        bars[j].style.height = bars[j + 1].style.height;
        bars[j].innerText = bars[j + 1].innerText;

        bars[j + 1].style.height = tempHeight;
        bars[j + 1].innerText = tempVal;
      }

      bars[j].classList.remove("red_bar");
      bars[j + 1].classList.remove("red_bar");
    }

    // Mark sorted element
    bars[bars.length - i - 1].classList.add("green_bar");
  }
  stoploop = true;
  onlyOneSort = true;
}

// Selection Sort Algorithm
async function selectionSort() {
  if (!onlyOneSort) return;
  onlyOneSort = false;
  stoploop = false;

  let bars = main_box.children;

  for (let i = 0; i < bars.length - 1; i++) {
    let min_idx = i;
    if (bars[i].classList.contains("iter_box")) continue;

    for (let j = i + 1; j < bars.length; ++j) {
      if (stoploop) return;

      bars[j].classList.add("red_bar");
      bars[min_idx].classList.add("red_bar");

      iteration.textContent = `i=${i - 1},j=${j}`;
      await wait(40);

      let val1 = parseInt(bars[j].innerText);
      let val2 = parseInt(bars[min_idx].innerText);

      if (val1 < val2) {
        bars[min_idx].classList.remove("red_bar");
        min_idx = j;
      }

      bars[j].classList.remove("red_bar");
    }

    if (min_idx != i) {
      let tempHeight = bars[i].style.height;
      let tempVal = bars[i].innerText;

      bars[i].style.height = bars[min_idx].style.height;
      bars[i].innerText = bars[min_idx].innerText;

      bars[min_idx].style.height = tempHeight;
      bars[min_idx].innerText = tempVal;
    }
    bars[i].classList.add("green_bar");
  }
  stoploop = true;
  onlyOneSort = true;
}

// Insertion Sort Algorithm
async function insertionSort() {
  if (!onlyOneSort) return;
  onlyOneSort = false;
  stoploop = false;

  let bars = main_box.children;

  //i=2,because 1st child is iter_box
  for (let i = 2; i < bars.length; i++) {
    let keyHeight = bars[i].style.height;
    let keyValue = bars[i].innerText;
    let j = i - 1;

    while (j >= 1 && parseInt(bars[j].innerText) > parseInt(keyValue)) {
      if (stoploop) return;

      bars[j].classList.add("red_bar");
      bars[j + 1].classList.add("red_bar");

      iteration.textContent = `i=${i - 1},j=${j}`;
      await wait(40);

      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].innerText = bars[j].innerText;

      bars[j].classList.remove("red_bar");
      bars[j + 1].classList.remove("red_bar");

      j = j - 1;
    }

    bars[j + 1].style.height = keyHeight;
    bars[j + 1].innerText = keyValue;
    bars[j + 1].classList.add("green_bar");
  }

  // Final pass to color all bars green
  for (let k = 1; k < bars.length; k++) {
    bars[k].classList.add("green_bar");
  }
  onlyOneSort = true;
}

// Slider logic to update bar count dynamically
let slider = document.getElementById("slider");
let sliderVal = document.getElementById("sliderVal");

slider.addEventListener("input", () => {
  sliderVal.textContent = slider.value; // Show slider value
  genrateArr();                          // Regenerate array with new count
});
