const CACHE_NAME = 'kunstprojekt-cache-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/icon.png',
  // Werke
  '/Werke/werk1.html',
  '/Werke/werk2.html',
  '/Werke/werk3.html',
  '/Werke/werk4.html',
  '/Werke/werk5.html',
  '/Werke/werk6.html',
  '/Werke/werk7.html',
  '/Werke/werk8.html',
  '/Werke/werk9.html',
  '/Werke/werk10.html',
  // Bilder
  '/Werke/bild1.jpg',
  '/Werke/bild2.jpg',
  '/Werke/bild3.jpg',
  '/Werke/bild4.jpg',
  '/Werke/bild5.jpg',
  '/Werke/bild6.jpg',
  '/Werke/bild7.jpg',
  '/Werke/bild8.jpg',
  '/Werke/bild9.jpg',
  '/Werke/bild10.jpg'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Dateien werden gecacht...');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('❌ Fehler beim Caching:', error);
      })
  );
});

// Aktivierung
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Abrufen von Ressourcen
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(error => {
        console.error('❌ Fehler beim Abrufen:', error);
        throw error;
      })
  );
});
