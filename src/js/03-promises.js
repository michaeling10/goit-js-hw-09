'use-strict';
import notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      setTimeout(() => resolve({ position, delay }), delay);
    } else {
      // Reject
      setTimeout(() => reject({ position, delay }), delay);
    }
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = parseInt(form.querySelector('input[name="delay"]').value);
  const step = parseInt(form.querySelector('input[name="step"]').value);
  const amount = parseInt(form.querySelector('input[name="amount"]').value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const currentDelay = delay + i * step;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
