import Notiflix from 'notiflix';
const refs = {
  delayInputEl: document.querySelector(`[name="delay"]`),
  stepInputEl: document.querySelector(`[name="step"]`),
  amountInputEl: document.querySelector(`[name="amount"]`),
  submitBtnEl: document.querySelector(`button`),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  delay = +refs.delayInputEl.value + position * delay;
  position += 1;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

refs.submitBtnEl.addEventListener(`click`, event => {
  event.preventDefault();

  for (let i = 0; i < refs.amountInputEl.value; i += 1) {
    setTimeout(() => {
      createPromise(i, refs.stepInputEl.value)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`,
            {
              useIcon: false,
            }
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`,
            {
              useIcon: false,
            }
          );
        });
    }, +refs.delayInputEl.value + i * refs.stepInputEl.value);
  }
});
