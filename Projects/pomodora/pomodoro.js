
const timeDisplay = document.getElementById('time-display');
const progressCircle = document.getElementById('progress-circle');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workDurationInput = document.getElementById('work-duration');
const themeToggle = document.getElementById('theme-toggle');

let timeLeft = 25 * 60; // 25 minutes in seconds
let totalTime = 25 * 60;
let timerId = null;
let isRunning = false;

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update progress ring
function updateProgress() {
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (timeLeft / totalTime) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

// Timer tick
function tick() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.textContent = formatTime(timeLeft);
        updateProgress();
    } else {
        completeTimer();
    }
}

// Start timer
startBtn.addEventListener('click', () => {
    if (timerId) return; // prevents duplicates

    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;

    timerId = setInterval(tick, 1000);
});

// Pause timer
pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerId);
        timerId = null;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
});

// Reset timer
resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    const minutes = parseInt(workDurationInput.value) || 25;
    timeLeft = minutes * 60;
    totalTime = minutes * 60;
    timeDisplay.textContent = formatTime(timeLeft);
    updateProgress();
    updateProgress();
});

// Timer complete
function completeTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;

    // Play notification sound (using AudioContext for no external assets)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.1;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);

    // Notification
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Complete!', {
            body: 'Time to take a break!',
            icon: '⏱️'
        });
    }

    // Visual feedback
    timeDisplay.textContent = 'Done!';
    document.querySelector('.card').style.animation = 'pulse 0.5s ease 3';

    setTimeout(() => {
        timeDisplay.textContent = formatTime(timeLeft);
        document.querySelector('.card').style.animation = '';
    }, 2000);
}

// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Update duration
workDurationInput.addEventListener('change', () => {
    if (!isRunning) {
        const minutes = parseInt(workDurationInput.value) || 25;
        timeLeft = minutes * 60;
        totalTime = minutes * 60;
        timeDisplay.textContent = formatTime(timeLeft);
        updateProgress();
    }
});
timeDisplay.textContent = formatTime(timeLeft);
updateProgress();

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);


