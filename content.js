const SHORTS_SELECTORES = [
  'ytd-reel-shelf-renderer', // Seccion de Shorts en el feed principal
  'ytd-rich-shelf-renderer[is-shorts]', // Variante del anterior que aprece en algunas versiones de YouTube
  '[title="Shorts"]', // El icono de Shorts que aparece en la barra lateral izquierda
  'ytd-video-renderer:has(a[href*="/shorts/"])', // Shorts mezclados en el feed principal
  'grid-shelf-view-model', // Bloque de Shorts que aparecen al buscar algo en YouTube
];


const style = document.createElement('style');
document.head.appendChild(style);

function activar() {
  
  style.textContent = SHORTS_SELECTORES.join(', ') + ' { display: none !important; }';
}

function desactivar() {
  style.textContent = ''; 
}

// Lee el estado al cargar la página
chrome.storage.local.get('activo', ({ activo }) => {
  if (activo === undefined || activo === true) {
    activar();
  } else {
    desactivar();
  }
});

// Escucha mensajes del popup
chrome.runtime.onMessage.addListener((mensaje) => {
  if (mensaje.activo) {
    activar();
  } else {
    desactivar();
  }
});