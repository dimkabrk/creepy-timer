document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const message = document.getElementById('message');
    const tickSound = document.getElementById('tickSound');
    const creepyMusic = document.getElementById('creepyMusic');
    
    let timeLeft = 60; // 1 минута
    let timerInterval;
    let isRunning = false;
    
    // Функция обновления таймера
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Изменение цвета при уменьшении времени
        if (timeLeft < 10) {
            timerDisplay.style.color = '#ff0000';
            timerDisplay.style.textShadow = '0 0 20px #ff0000';
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = '#000';
        }
        
        // Проигрываем звук тиканья часов
        tickSound.currentTime = 0;
        tickSound.play();
        
        // Рандомные мерцания
        if (Math.random() < 0.1) {
            document.body.style.opacity = 0.7;
            setTimeout(() => {
                document.body.style.opacity = 1;
            }, 100);
        }
        
        // Когда время вышло
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00";
            message.textContent = "ОНИ ПРИШЛИ...";
            message.style.opacity = 1;
            
            // Усиливаем эффект
            creepyMusic.volume = 1;
            document.body.style.animation = 'shake 0.5s infinite';
            
            // Создаем эффект появления "призраков"
            createGhosts();
        } else {
            timeLeft--;
        }
    }
    
    // Создание "призраков" после окончания таймера
    function createGhosts() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const ghost = document.createElement('div');
                ghost.className = 'ghost';
                ghost.style.left = `${Math.random() * 100}%`;
                ghost.style.top = `${Math.random() * 100}%`;
                ghost.style.opacity = Math.random();
                ghost.style.transform = `scale(${Math.random() * 2 + 1})`;
                document.body.appendChild(ghost);
                
                // Анимация исчезновения
                setTimeout(() => {
                    ghost.style.opacity = 0;
                    setTimeout(() => {
                        ghost.remove();
                    }, 1000);
                }, 2000);
            }, i * 500);
        }
    }
    
    // Обработчик кнопки старта
    startBtn.addEventListener('click', function() {
        if (!isRunning) {
            isRunning = true;
            startBtn.textContent = "ОСТАНОВИТЬ";
            startBtn.style.backgroundColor = "#ff0000";
            startBtn.style.color = "#000";
            
            // Начинаем воспроизведение музыки
            creepyMusic.volume = 0.3;
            creepyMusic.play();
            
            // Запускаем таймер
            timerInterval = setInterval(updateTimer, 1000);
            updateTimer();
        } else {
            // Останавливаем таймер
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.textContent = "НАЧАТЬ";
            startBtn.style.backgroundColor = "#000";
            startBtn.style.color = "#ff0000";
            
            // Останавливаем музыку
            creepyMusic.pause();
            creepyMusic.currentTime = 0;
            
            // Сбрасываем таймер
            timeLeft = 60;
            timerDisplay.textContent = "01:00";
            timerDisplay.style.color = "#ff0000";
            timerDisplay.style.textShadow = "0 0 15px #ff0000";
            message.style.opacity = 0;
        }
    });
    
    // Добавляем стили для призраков
    const style = document.createElement('style');
    style.textContent = `
        .ghost {
            position: fixed;
            width: 100px;
            height: 150px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50% 50% 0 0;
            pointer-events: none;
            z-index: 100;
            transition: all 2s;
            filter: blur(5px);
        }
        
        .ghost::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 0, 0, 0.5);
            border-radius: 50%;
            top: 30px;
            left: 20px;
            box-shadow: 30px 0 0 rgba(255, 0, 0, 0.5);
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});