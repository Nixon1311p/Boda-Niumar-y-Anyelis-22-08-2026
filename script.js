// Configurar la fecha objetivo: 22 de Agosto de 2026 a las 19:00 (7 PM)
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownEl = document.getElementById("countdown");
const expiredMessageEl = document.getElementById("expired-message");

if (daysEl && hoursEl && minutesEl && secondsEl && countdownEl && expiredMessageEl) {
    const targetDate = new Date("August 22, 2026 19:00:00").getTime();

    const interval = setInterval(function() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        // Cálculos de tiempo para días, horas, minutos y segundos
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Inyectar los valores en el HTML agregando un cero a la izquierda si es menor a 10
        daysEl.innerText = days < 10 ? "0" + days : days;
        hoursEl.innerText = hours < 10 ? "0" + hours : hours;
        minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;

        // Si la cuenta regresiva termina
        if (difference < 0) {
            clearInterval(interval);
            countdownEl.classList.add("d-none");
            expiredMessageEl.classList.remove("d-none");
        }
    }, 1000);
}

const typingTargets = document.querySelectorAll('.cinta-biblica p, .contendor-lugares h4, .textox h3, .contenedor-fotos-historia h4, .container-tiempo h3, .container-tiempo h4, .container-tiempo samp, .texto-portada-1 h2, .texto-portada-1 p');

typingTargets.forEach((typingText) => {
    const originalText = typingText.textContent.trim();
    const contentSpan = document.createElement('span');
    contentSpan.className = 'typing-content';
    typingText.textContent = '';
    typingText.appendChild(contentSpan);

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    typingText.appendChild(cursor);

    let index = 0;
    let typingTimer = null;

    const resetTyping = () => {
        if (typingTimer) clearTimeout(typingTimer);
        index = 0;
        contentSpan.textContent = '';
        if (!typingText.contains(cursor)) {
            typingText.appendChild(cursor);
        }
    };

    const typeCharacter = () => {
        if (index < originalText.length) {
            contentSpan.textContent += originalText[index];
            index += 1;
            typingTimer = setTimeout(typeCharacter, 70);
        } else {
            cursor.remove();
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                resetTyping();
                typeCharacter();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(typingText);
});

// Observe location cards and replay the entrance animation every time they enter the viewport
const locationCards = document.querySelectorAll('.card-ubicacion-1, .card-ubicacion-2');
const triggerCardAnimation = (card) => {
    card.classList.remove('in-view');
    void card.offsetWidth;
    requestAnimationFrame(() => card.classList.add('in-view'));
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      triggerCardAnimation(entry.target);
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, { threshold: 0.2 });

locationCards.forEach(card => cardObserver.observe(card));