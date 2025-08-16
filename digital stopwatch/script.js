const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const resetBtn = document.querySelector('#reset-btn');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
const msecond = document.querySelector('.msecond');
let hr = 0;
let min = 0;
let sec = 0;
let msec = 0;
let timer = null;

function start() {
    if (timer !== null) return; // Prevent starting multiple intervals
    timer = setInterval(UpdateTime, 10);
}

function stop() {
    clearInterval(timer);
    timer = null;
}

function reset() {
    clearInterval(timer);
    timer = null;
    hr = 0;
    min = 0;
    sec = 0;
    msec = 0;
    hour.textContent = '00';
    minute.textContent = '00';
    second.textContent = '00';
    msecond.textContent = '00';
}

function UpdateTime() {
    msec++;
    if (msec == 100) {
        msec = 0;
        sec++;
    }
    if (sec === 60) {
        sec = 0;
        min++;
    }

    if (min === 60) {
        min = 0;
        hr++;
    }
    msecond.textContent = String(msec).padStart(2, '0');
    second.textContent = String(sec).padStart(2, '0');
    minute.textContent = String(min).padStart(2, '0');
    hour.textContent = String(hr).padStart(2, '0');
}
