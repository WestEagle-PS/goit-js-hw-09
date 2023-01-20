import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';

const refs = {
  days: document.querySelector(`[data-days]`),
  hours: document.querySelector(`[data-hours]`),
  minutes: document.querySelector(`[data-minutes]`),
  seconds: document.querySelector(`[data-seconds]`),
  inputField: document.querySelector(`input`),
  startBtn: document.querySelector(`button`),
  timer: document.querySelector(`.timer`),
  field: document.querySelectorAll(`.field`),
  value: document.querySelectorAll(`.value`),
};

let selectedDate = null;
refs.startBtn.setAttribute(`disabled`, '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();

    if (selectedDate < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      refs.startBtn.setAttribute(`disabled`, '');
    } else {
      Notiflix.Notify.success('Date you choose is valid, press "START"');
      refs.startBtn.removeAttribute(`disabled`);
    }
  },
};

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onClickBtnStart() {
  let timerIntervalStart = setInterval(() => {
    const timeDifferenceValue = selectedDate - Date.now();

    if (convertMs(timeDifferenceValue).seconds === -1) {
      clearInterval(timerIntervalStart);
      return;
    }

    refs.days.textContent = addLeadingZero(convertMs(timeDifferenceValue).days);
    refs.hours.textContent = addLeadingZero(
      convertMs(timeDifferenceValue).hours
    );
    refs.minutes.textContent = addLeadingZero(
      convertMs(timeDifferenceValue).minutes
    );
    refs.seconds.textContent = addLeadingZero(
      convertMs(timeDifferenceValue).seconds
    );
  }, 500);
}

refs.inputField.addEventListener(
  `input`,
  flatpickr('#datetime-picker', options)
);

refs.startBtn.addEventListener(`click`, () => onClickBtnStart());

refs.timer.style.cssText = `display: flex; gap: 20px; font-size: 20px; justify-content: left; font-weight: 500;`;

refs.field.forEach(element => {
  element.style.cssText = `display: flex; gap: 8px; flex-direction: row; align-items: center; background-color: tomato;margin-top: 20px; padding: 10px;`;
});

refs.value.forEach(element => {
  element.style.fontSize = `50px`;
});
