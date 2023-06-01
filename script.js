let timerDisplay = document.getElementById('timer');
let messageDisplay = document.getElementById('message');
let startButton = document.getElementById('startBtn');
let resetButton = document.getElementById('resetBtn');
let studyTime = 50 * 60; // 50 minutes in seconds
let breakTime = 10 * 60; // 10 minutes in seconds
let isRunning = false;
let startSound = new Audio('start.mp3');
let intInitSound = new Audio('Mario.mp3');
let restartSound = new Audio('Lets_go.mp3');
let interval;

function playStartAlertSound() {
  startSound.play();
}

function playIntervalAlertSound() {
  intInitSound.play();
}

function playRestartAlertSound() {
  restartSound.play();
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startButton.disabled = true;
    resetButton.disabled = false;
    messageDisplay.textContent = "Mantenha-se focado!";
    playStartAlertSound();

    interval = setInterval(function() {
      if (studyTime > 0) {
        studyTime--;
        updateTimer(studyTime);
        if (studyTime === 0) {
          playIntervalAlertSound();
        }
      } else if (breakTime > 0) {
        breakTime--;
        updateTimer(breakTime);
        if (breakTime === 0) {
          messageDisplay.textContent = "Agora descanse, você merece!";
          playRestartAlertSound();
        }
      } else {
        clearInterval(interval);
        studyTime = 50 * 60;
        breakTime = 10 * 60;
        isRunning = false;
        startButton.disabled = false;
        resetButton.disabled = true;
        messageDisplay.textContent = "Tempo de estudo concluído!";
        playIntervalAlertSound();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(interval);
  studyTime = 50 * 60;
  breakTime = 10 * 60;
  isRunning = false;
  startButton.disabled = false;
  resetButton.disabled = true;
  messageDisplay.textContent = "";
  updateTimer(studyTime);
}

function updateTimer(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  timerDisplay.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
  return number < 10 ? '0' + number : number;
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
updateTimer(studyTime);