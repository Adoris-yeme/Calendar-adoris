// Minimal service worker pour activer les fonctionnalités PWA.
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
  // Ce service worker ne gère pas le fetch pour l'instant, 
  // il est juste là pour rendre l'application installable.
});
