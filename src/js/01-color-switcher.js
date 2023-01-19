const startBtnEl = document.querySelector(`[data-start]`);
const stopBtnEl = document.querySelector(`[data-stop]`);

startBtnEl.addEventListener(`click`, clickOnBtnStart);
stopBtnEl.addEventListener(`click`, clickOnBtnStop);

startBtnEl.style.cssText = `
    padding: 12px 12px;
    position: absolute;
    color: black;
    top: 35vh;
    left: 50vw;
    text-transform: uppercase;
`;

stopBtnEl.style.cssText = `
    padding: 12px 12px;
    position: absolute;
    color: black;
    top: 35vh;
    left: 50vw;
    transform: translate(5%,120%);
    text-transform: uppercase;
`;

let changeBgc = null;

stopBtnEl.setAttribute(`disabled`, ``);

function clickOnBtnStart() {
  startBtnEl.setAttribute('disabled', '');
  stopBtnEl.removeAttribute('disabled');

  changeBgc = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    const date = new Date();
    console.log(
      `backgroundColor ==> ${
        document.body.style.backgroundColor
      } at ${date.toLocaleTimeString()}`
    );
  }, 1000);
}

function clickOnBtnStop() {
  startBtnEl.removeAttribute('disabled');
  stopBtnEl.setAttribute('disabled', '');
  clearInterval(changeBgc);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
