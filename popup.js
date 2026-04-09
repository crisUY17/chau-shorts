// Por ahora solo muestra el estado activo.
// Acá después podés agregar un toggle para activar/desactivar la extensión.
const toggle = document.getElementById('toggle');
const label  = document.getElementById('label');

// Al abrir el popup, leer el estado guardado
chrome.storage.local.get('activo', ({ activo }) => {
  const estaActivo = activo === undefined ? true : activo;
  toggle.checked = estaActivo;
  label.textContent = estaActivo ? 'Activo' : 'Inactivo';
});

// Al cambiar el switch
toggle.addEventListener('change', () => {
  const activo = toggle.checked;
  label.textContent = activo ? 'Activo' : 'Inactivo';

  // Guardar el estado
  chrome.storage.local.set({ activo });

  // Avisar al content script de la pestaña activa
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { activo });
  });
});