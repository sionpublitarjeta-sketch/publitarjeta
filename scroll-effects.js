document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const opacity = 1 - (scrollPosition / maxScroll) * 0.5; // Fade out up to 50%

    const particlesElement = document.getElementById('particles-js');
    if (particlesElement) {
        particlesElement.style.opacity = opacity;
    }

    const watermarkElement = document.querySelector('.watermark');
    if (watermarkElement) {
        if (scrollPosition > 50) {
            watermarkElement.classList.add('hidden');
        } else {
            watermarkElement.classList.remove('hidden');
        }
    }

    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        if (scrollPosition > 50) {
            logoElement.classList.add('scrolled');
        } else {
            logoElement.classList.remove('scrolled');
        }
    }
});