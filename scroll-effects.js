// Mejor manejo del scroll: usar RAF y listener passive para rendimiento
(() => {
    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
            const opacity = Math.max(0, Math.min(1, 1 - (scrollPosition / maxScroll) * 0.5));

            const particlesElement = document.getElementById('particles-js');
            if (particlesElement) {
                particlesElement.style.opacity = opacity;
            }

            const watermarkElement = document.querySelector('.watermark');
            if (watermarkElement) {
                watermarkElement.classList.toggle('hidden', scrollPosition > 50);
            }

            const logoElement = document.querySelector('.logo');
            if (logoElement) {
                logoElement.classList.toggle('scrolled', scrollPosition > 50);
            }

            ticking = false;
        });
    }

    // Añadir listener passive si el navegador lo soporta
    window.addEventListener('scroll', onScroll, { passive: true });
})();