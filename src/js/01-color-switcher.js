'use-strict';

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timeColorChange;

startButton.addEventListener('click', startBtnFunction);
stopButton.addEventListener('click', stopBtnFunction);

function startBtnFunction() {
  startButton.disabled = true;
  stopButton.disabled = false;
  timeColorChange = setInterval(setBackgroundColor, 1000);
}

function stopBtnFunction() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(timeColorChange);
}

function setBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
