'use-strict';
// Descrito en la documentación
import flatpickr from 'flatpickr';
// Importación adicional de estilos
import 'flatpickr/dist/flatpickr.min.css';
import notiflix from 'notiflix';

const dataTimeElement = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

const timeElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const datetimePicker = flatpickr(dataTimeElement, options);

let countDown;

startButton.addEventListener('click', () => {
  const selectedDate = datetimePicker.selectedDates[0];
  const endDate = selectedDate.getTime();

  startButton.disabled = true;
  countDown = setInterval(updateTimer, 1000, endDate);
});

function updateTimer(endDate) {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  const timeDifference = endDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(countDown);
    startButton.disabled = false;
    notiflix.Notify.success('Countdown completed');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  timeElements.days.textContent = timerZeros(days);
  timeElements.hours.textContent = timerZeros(hours);
  timeElements.minutes.textContent = timerZeros(minutes);
  timeElements.seconds.textContent = timerZeros(seconds);
}

function timerZeros(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

notiflix.Notify.success('Countdown completed');
notiflix.Notify.failure('Please choose a date in the future');
