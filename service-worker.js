const CACHE_NAME = 'kunstprojekt-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/icon.png',

  // Werkseiten
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

  // Bilder zu den Werken
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
        console.log('📦 Inhalte werden zwischengespeichert...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktivierung
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
});

// Abrufen
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

