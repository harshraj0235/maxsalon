self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // A simple pass-through fetch handler is enough to pass the PWA installation requirement
  e.respondWith(fetch(e.request).catch(() => new Response('Offline Mode')));
});
