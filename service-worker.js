// Service Worker für Backpack Simulator PWA
// Sorgt dafür, dass die App auch ohne Internet funktioniert.

const CACHE_NAME = 'backpack-simulator-v2';
const ASSETS = [
  './',
  './index.html',
  './BackpackSimulator.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './favicon-32.png',
  // Google Fonts werden beim ersten Laden über den Fetch-Handler gecacht
];

// Install: Alle Kern-Assets vorcachen
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Alte Caches aufräumen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: Cache-First-Strategie. Wenn im Cache -> von dort; sonst Netz + cachen.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Nur erfolgreiche Basic-Responses cachen
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Offline-Fallback: wenigstens das Main-HTML liefern, falls vorhanden
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html',
  './BackpackSimulator.html');
        }
      });
    })
  );
});
