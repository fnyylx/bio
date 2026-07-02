document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.getElementById('particle-container');
    const numberOfParticles = 150; // Увеличили количество частиц
    const minParticleSize = 3;   // Минимальный размер частицы (px)
    const maxParticleSize = 8;   // Максимальный размер частицы (px)
    const maxAnimationDuration = 20; // Максимальная продолжительность падения в секундах (от 10 до 30)

    // Сначала добавляем CSS стили и @keyframes
    const style = document.createElement('style');
    style.innerHTML = `
        .particle {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.6); /* Цвет частиц, чуть прозрачнее */
            border-radius: 50%; /* Круглая форма */
            animation: particleFall linear infinite; /* Применяем анимацию падения */
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.4); /* Чуть более заметное свечение */
            z-index: -1; /* Убедимся, что частицы под основным контентом */
        }

        @keyframes particleFall {
            0% {
                /* Частица появляется сверху экрана (или чуть выше) */
                transform: translateY(-100vh) translateX(var(--x-offset, 0)) scale(var(--particle-scale, 1));
                opacity: 0.7; /* Частица видна с самого начала ее цикла анимации */
            }
            100% {
                /* Частица падает вниз, за пределы экрана */
                transform: translateY(100vh) translateX(var(--x-offset, 0)) scale(var(--particle-scale, 1));
                opacity: 0.7; /* Частица видна и в конце ее цикла анимации, перед тем как перезапуститься */
            }
        }
    `;
    document.head.appendChild(style);

    // Затем создаем и добавляем частицы
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайная начальная горизонтальная позиция
        particle.style.left = `${Math.random() * 100}%`;
        // Случайная начальная вертикальная позиция, чтобы они были разбросаны по экрану сразу
        particle.style.top = `${Math.random() * 100}%`; 

        // Случайный размер
        const size = Math.random() * (maxParticleSize - minParticleSize) + minParticleSize;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Случайная продолжительность анимации для разнообразия скорости падения
        const duration = Math.random() * maxAnimationDuration + 10; // От 10 до 30 секунд
        particle.style.animationDuration = `${duration}s`;
        
        // *** Главное изменение: отрицательная задержка анимации ***
        // Это заставляет частицы начать анимацию ДО загрузки страницы,
        // поэтому они уже будут в движении и видны
        particle.style.animationDelay = `-${Math.random() * duration}s`; 
        
        // Случайное смещение по X для эффекта дрейфа
        const randomXOffset = Math.random() * 60 - 30; // От -30 до +30px
        particle.style.setProperty('--x-offset', `${randomXOffset}px`);

        // Случайный масштаб для имитации глубины
        const scale = Math.random() * (1.2 - 0.5) + 0.5; // От 0.5 до 1.2
        particle.style.setProperty('--particle-scale', `${scale}`);

        particleContainer.appendChild(particle);
    }
});