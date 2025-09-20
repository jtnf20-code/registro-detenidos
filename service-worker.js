const CACHE_NAME = 'detenidos-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './xlsx.full.min.js',
  './manifest.json',
  './icon-192x192.png', // Asegúrate de que estos iconos existan
  './icon-512x512.png', // Asegúrate de que estos iconos existan
  // Añade aquí todas tus plantillas .odt y otros archivos estáticos
  // Por ejemplo:
  // './plantillas/plantilla_amarilla.odt',
  // './plantillas/plantilla_derechos_italiano.odt',
  // etc.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});