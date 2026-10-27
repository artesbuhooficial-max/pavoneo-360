// Convenience only: the BIME library remains accessible through its shared URL.
// No personal contact data is stored in the browser.
(() => {
  'use strict';
  const key = 'pavoneo360:bime:access:v1';
  const page = document.documentElement.dataset.bimeAccess;
  try {
    if (page === 'library') {
      localStorage.setItem(key, '1');
      const notice = document.getElementById('acceso-recordado');
      if (notice) notice.hidden = false;
    } else if (page === 'registration' && localStorage.getItem(key) === '1') {
      window.location.replace(new URL('contenidos/', window.location.href).href);
    }
  } catch (_) {
    // If browser storage is unavailable, the registration and library still work.
  }
})();
