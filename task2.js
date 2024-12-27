let startTime;
let updatedTime;
let running = false;
let elapsedTime = 0;
let interval;
let lapTimes = [];

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const lapList = document.getElementById("lapList");

function startStop() {
  if (!running) {
    // Start the stopwatch
    running = true;
    startTime = new Date().getTime() - elapsedTime;
    interval = setInterval(updateTime, 10); // Update every 10ms
    startStopBtn.textContent = "Pause";
  } else {
    // Pause the stopwatch
    running = false;
    clearInterval(interval);
    startStopBtn.textContent = "Resume";
  }
}

function updateTime() {
  updatedTime = new Date().getTime();
  elapsedTime = updatedTime - startTime;
  const time = new Date(elapsedTime);
  
  const minutes = time.getUTCMinutes().toString().padStart(2, "0");
  const seconds = time.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = time.getUTCMilliseconds().toString().padStart(3, "0");
  
  display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function reset() {
  running = false;
  clearInterval(interval);
  elapsedTime = 0;
  display.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  lapTimes = [];
  lapList.innerHTML = '';
}

function recordLap() {
  if (running) {
    const lapTime = new Date(elapsedTime);
    const minutes = lapTime.getUTCMinutes().toString().padStart(2, "0");
    const seconds = lapTime.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = lapTime.getUTCMilliseconds().toString().padStart(3, "0");
    
    const lapText = `${minutes}:${seconds}:${milliseconds}`;
    lapTimes.push(lapText);

    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapText}`;
    lapList.appendChild(lapItem);
  }
}
