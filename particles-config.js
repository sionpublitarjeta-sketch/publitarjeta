function initParticles() {
  // ajustar la cantidad de partículas según ancho de la ventana para mejor rendimiento en móviles
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const base = 80;
  const value = vw < 480 ? Math.round(base * 0.35) : (vw < 768 ? Math.round(base * 0.6) : base);

  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": value,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.4,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.2,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 0.5
        }
      }
    }
  },
    "retina_detect": true
  });
}

// Auto-inicializar y re-inicializar al redimensionar con debounce
initParticles();
let _prtTimeout = null;
window.addEventListener('resize', () => {
  clearTimeout(_prtTimeout);
  _prtTimeout = setTimeout(() => initParticles(), 250);
});
