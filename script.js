var timerDisplay = document.getElementById('timer');
var messageDisplay = document.getElementById('message');
var startButton = document.getElementById('startBtn');
var resetButton = document.getElementById('resetBtn');
var studyTime = 50 * 60; // 50 minutes in seconds
var breakTime = 10 * 60; // 10 minutes in seconds
var isRunning = false;
var interval;

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startButton.disabled = true;
    resetButton.disabled = false;
    messageDisplay.textContent = "Mantenha-se focado!";

    interval = setInterval(function() {
      if (studyTime > 0) {
        studyTime--;
        updateTimer(studyTime);
      } else if (breakTime > 0) {
        breakTime--;
        updateTimer(breakTime);
        if (breakTime === 0) {
          messageDisplay.textContent = "Agora descanse, você merece!";
        }
      } else {
        clearInterval(interval);
        studyTime = 50 * 60;
        breakTime = 10 * 60;
        isRunning = false;
        startButton.disabled = false;
        resetButton.disabled = true;
        messageDisplay.textContent = "Tempo de estudo concluído!";
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