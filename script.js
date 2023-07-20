//1.Bubble.sort
async function bubble() {
  const ele = document.querySelectorAll(".bar");
  for (let i = 0; i < ele.length - 1; i++) {
    for (let j = 0; j < ele.length - i - 1; j++) {
      ele[j].style.background = "red";
      ele[j + 1].style.background = "red";
      if (parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)) {
        await waitforme(delay);
        swap(ele[j], ele[j + 1]);
      }
      ele[j].style.background = "#D4F422";
      ele[j + 1].style.background = "#D4F422";
    }
    ele[ele.length - 1 - i].style.background = "green";
  }
  ele[0].style.background = "green";
}

const bubSortbtn = document.querySelector(".bubbleSort");
bubSortbtn.addEventListener("click", async function () {
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await bubble();
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});

//2.insertion sort

async function insertion() {
  const ele = document.querySelectorAll(".bar");
  // color
  ele[0].style.background = "green";
  for (let i = 1; i < ele.length; i++) {
    let j = i - 1;
    let key = ele[i].style.height;
    // color
    ele[i].style.background = "red";
    await waitforme(delay);
    while (j >= 0 && parseInt(ele[j].style.height) > parseInt(key)) {
      // color
      ele[j].style.background = "red";
      ele[j + 1].style.height = ele[j].style.height;
      j--;

      await waitforme(delay);

      // color
      for (let k = i; k >= 0; k--) {
        ele[k].style.background = "green";
      }
    }
    ele[j + 1].style.height = key;
    // color
    ele[i].style.background = "green";
  }
}

const inSortbtn = document.querySelector(".insertionSort");
inSortbtn.addEventListener("click", async function () {
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await insertion();
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});

//3.merge sort

async function merge(ele, low, mid, high) {
  const n1 = mid - low + 1;
  const n2 = high - mid;
  let left = new Array(n1);
  let right = new Array(n2);

  for (let i = 0; i < n1; i++) {
    await waitforme(delay);
    // color
    ele[low + i].style.background = "red";
    left[i] = ele[low + i].style.height;
  }
  for (let i = 0; i < n2; i++) {
    await waitforme(delay);
    // color
    ele[mid + 1 + i].style.background = "aqua";
    right[i] = ele[mid + 1 + i].style.height;
  }
  await waitforme(delay);
  let i = 0,
    j = 0,
    k = low;
  while (i < n1 && j < n2) {
    await waitforme(delay);
    if (parseInt(left[i]) <= parseInt(right[j])) {
      // color
      if (n1 + n2 === ele.length) {
        ele[k].style.background = "green";
      } else {
        ele[k].style.background = "maroon";
      }

      ele[k].style.height = left[i];
      i++;
      k++;
    } else {
      // color
      if (n1 + n2 === ele.length) {
        ele[k].style.background = "green";
      } else {
        ele[k].style.background = "maroon";
      }
      ele[k].style.height = right[j];
      j++;
      k++;
    }
  }
  while (i < n1) {
    await waitforme(delay);
    // color
    if (n1 + n2 === ele.length) {
      ele[k].style.background = "green";
    } else {
      ele[k].style.background = "maroon";
    }
    ele[k].style.height = left[i];
    i++;
    k++;
  }
  while (j < n2) {
    await waitforme(delay);
    // color
    if (n1 + n2 === ele.length) {
      ele[k].style.background = "green";
    } else {
      ele[k].style.background = "maroon";
    }
    ele[k].style.height = right[j];
    j++;
    k++;
  }
}

async function mergeSort(ele, l, r) {
  if (l >= r) {
    console.log(`return cause just 1 elemment l=${l}, r=${r}`);
    return;
  }
  const m = l + Math.floor((r - l) / 2);
  await mergeSort(ele, l, m);
  await mergeSort(ele, m + 1, r);
  await merge(ele, l, m, r);
}

const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener("click", async function () {
  let ele = document.querySelectorAll(".bar");
  let l = 0;
  let r = parseInt(ele.length) - 1;
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await mergeSort(ele, l, r);
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});

//4.quick sort

async function partitionLomuto(ele, l, r) {
  let i = l - 1;
  // color pivot element
  ele[r].style.background = "red";
  for (let j = l; j <= r - 1; j++) {
    // color current element
    ele[j].style.background = "blue";
    // pauseChamp
    await waitforme(delay);

    if (parseInt(ele[j].style.height) < parseInt(ele[r].style.height)) {
      i++;
      swap(ele[i], ele[j]);
      // color
      ele[i].style.background = "maroon";
      if (i != j) ele[j].style.background = "maroon";
      // pauseChamp
      await waitforme(delay);
    } else {
      // color if not less than pivot
      ele[j].style.background = "blue";
    }
  }
  i++;
  // pauseChamp
  await waitforme(delay);
  swap(ele[i], ele[r]); // pivot height one

  // color
  ele[r].style.background = "lemon";
  ele[i].style.background = "green";

  // pauseChamp
  await waitforme(delay);

  // color
  for (let k = 0; k < ele.length; k++) {
    if (ele[k].style.background != "green") ele[k].style.background = "#D4F422";
  }

  return i;
}

async function quickSort(ele, l, r) {
  if (l < r) {
    let pivot_index = await partitionLomuto(ele, l, r);
    await quickSort(ele, l, pivot_index - 1);
    await quickSort(ele, pivot_index + 1, r);
  } else {
    if (l >= 0 && r >= 0 && l < ele.length && r < ele.length) {
      ele[r].style.background = "green";
      ele[l].style.background = "green";
    }
  }
}

const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener("click", async function () {
  let ele = document.querySelectorAll(".bar");
  let l = 0;
  let r = ele.length - 1;
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await quickSort(ele, l, r);
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});

//5.selection sort

async function selection() {
  const ele = document.querySelectorAll(".bar");
  for (let i = 0; i < ele.length; i++) {
    let min_index = i;
    // Change color of the position to swap with the next min
    ele[i].style.background = "red";
    for (let j = i + 1; j < ele.length; j++) {
      // Change color for the current comparision (in consideration for min_index)
      ele[j].style.background = "red";
      await waitforme(delay);
      if (
        parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)
      ) {
        if (min_index !== i) {
          // new min_index is found so change prev min_index color back to normal
          ele[min_index].style.background = "#D4F422";
        }
        min_index = j;
      } else {
        // if the currnent comparision is more than min_index change is back to normal
        ele[j].style.background = "#D4F422";
      }
    }
    await waitforme(delay);
    swap(ele[min_index], ele[i]);
    // change the min element index back to normal as it is swapped
    ele[min_index].style.background = "#D4F422";
    // change the sorted elements color to green
    ele[i].style.background = "green";
  }
}

const selectionSortbtn = document.querySelector(".selectionSort");
selectionSortbtn.addEventListener("click", async function () {
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await selection();
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});

//sorting

// swap function util for sorting algorithms takes input of 2 DOM elements with .style.height feature
function swap(el1, el2) {
  console.log("In swap()");
  let temp = el1.style.height;
  el1.style.height = el2.style.height;
  el2.style.height = temp;
}

// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSortingBtn() {
  document.querySelector(".bubbleSort").disabled = true;
  document.querySelector(".insertionSort").disabled = true;
  document.querySelector(".mergeSort").disabled = true;
  document.querySelector(".quickSort").disabled = true;
  document.querySelector(".selectionSort").disabled = true;
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn() {
  document.querySelector(".bubbleSort").disabled = false;
  document.querySelector(".insertionSort").disabled = false;
  document.querySelector(".mergeSort").disabled = false;
  document.querySelector(".quickSort").disabled = false;
  document.querySelector(".selectionSort").disabled = false;
}

// Disables size slider used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSizeSlider() {
  document.querySelector("#arr_sz").disabled = true;
}

// Enables size slider used in conjunction with disable
function enableSizeSlider() {
  document.querySelector("#arr_sz").disabled = false;
}

// Disables newArray buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableNewArrayBtn() {
  document.querySelector(".newArray").disabled = true;
}

// Enables newArray buttons used in conjunction with disable
function enableNewArrayBtn() {
  document.querySelector(".newArray").disabled = false;
}

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

// Selecting size slider from DOM
let arraySize = document.querySelector("#arr_sz");

// Event listener to update the bars on the UI
arraySize.addEventListener("input", function () {
  console.log(arraySize.value, typeof arraySize.value);
  createNewArray(parseInt(arraySize.value));
});

// Default input for waitforme function (260ms)
let delay = 260;

// Selecting speed slider from DOM
let delayElement = document.querySelector("#speed_input");

// Event listener to update delay time
delayElement.addEventListener("input", function () {
  console.log(delayElement.value, typeof delayElement.value);
  delay = 320 - parseInt(delayElement.value);
});

// Creating array to store randomly generated numbers
let array = [];

// Call to display bars right when you visit the site
createNewArray();

// To create new array input size of array
function createNewArray(noOfBars = 60) {
  // calling helper function to delete old bars from dom
  deleteChild();

  // creating an array of random numbers
  array = [];
  for (let i = 0; i < noOfBars; i++) {
    array.push(Math.floor(Math.random() * 250) + 1);
  }
  console.log(array);

  // select the div #bars element
  const bars = document.querySelector("#bars");

  // create multiple element div using loop and adding class 'bar col'
  for (let i = 0; i < noOfBars; i++) {
    const bar = document.createElement("div");
    bar.style.height = `${array[i] * 2}px`;
    bar.classList.add("bar");
    bar.classList.add("flex-item");
    bar.classList.add(`barNo${i}`);
    bars.appendChild(bar);
  }
}

// Helper function to delete all the previous bars so that new can be added
function deleteChild() {
  const bar = document.querySelector("#bars");
  bar.innerHTML = "";
}

// Selecting newarray button from DOM and adding eventlistener
const newArray = document.querySelector(".newArray");
newArray.addEventListener("click", function () {
  console.log("From newArray " + arraySize.value);
  console.log("From newArray " + delay);
  enableSortingBtn();
  enableSizeSlider();
  createNewArray(arraySize.value);
});
