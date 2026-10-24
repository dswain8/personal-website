const CACHE_NAME = 'sakshi-sanctuary-v3';

const STATIC_ASSETS = [
  '/sakshi/',
  '/sakshi/index.html',
  '/sakshi/manifest.json',
  '/sakshi/favicon.ico',
  '/sakshi/icon-192.png',
  '/sakshi/icon-512.png',
  '/sakshi/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
      );
    }),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Network-first strategy so deployments appear immediately when online,
  // with offline fallback from cache.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          return (
            (await caches.match('/sakshi/index.html')) ||
            (await caches.match('/sakshi/'))
          );
        }
        return Response.error();
      }),
  );
});
