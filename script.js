document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const message = document.getElementById('message');
    const tickSound = document.getElementById('tickSound');
    const fullscreenImage = document.getElementById('fullscreenImage'); // Новая строка!
    
    let timeLeft = 30;
    let timerInterval;
    let isRunning = false;
    
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Тикающий звук
        tickSound.currentTime = 0;
        tickSound.play();
        
        // Красный экран при малом времени
        if (timeLeft < 10) {
            timerDisplay.style.color = '#ff0000';
            timerDisplay.style.textShadow = '0 0 20px #ff0000';
        }
        
        // Рандомные мерцания
        if (Math.random() < 0.1) {
            document.body.style.opacity = 0.7;
            setTimeout(() => document.body.style.opacity = 1, 100);
        }
        
        // Когда время вышло
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00";
            message.textContent = "ПЛАН ТАБУРЕТКИ...";
            message.style.opacity = 1;
            
            // ===== ПОКАЗЫВАЕМ КАРТИНКУ =====
            fullscreenImage.src = "plantab.jpg"; // Путь к вашей картинке!
            fullscreenImage.classList.add('show');
            
            // Трясём экран
            document.body.style.animation = 'shake 0.5s infinite';
        } else {
            timeLeft--;
        }
    }
    
    // Кнопка старта/остановки
    startBtn.addEventListener('click', function() {
        if (!isRunning) {
            isRunning = true;
            startBtn.textContent = "ОСТАНОВИТЬ";
            timerInterval = setInterval(updateTimer, 1000);
            updateTimer();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.textContent = "НАЧАТЬ";
            timeLeft = 30;
            timerDisplay.textContent = "00:30";
            
            // ===== СБРАСЫВАЕМ КАРТИНКУ =====
            fullscreenImage.classList.remove('show');
            document.body.style.animation = '';
        }
    });
});
