const CACHE_NAME = 'lehastr-shell-v3';
const BASE_URL = new URL('./', self.location).pathname;
const APP_SHELL = [
  BASE_URL,
  `${BASE_URL}index.html`,
  `${BASE_URL}manifest.webmanifest`,
  `${BASE_URL}feed.xml`,
  `${BASE_URL}favicon.svg`,
  `${BASE_URL}assets/icon-192.png`,
  `${BASE_URL}assets/icon-512.png`,
  `${BASE_URL}assets/video-europa.jpg`,
  `${BASE_URL}assets/moment-jurassic.jpg`,
  `${BASE_URL}assets/moment-kenshi.jpg`,
  `${BASE_URL}assets/video-hoi4.jpg`,
  `${BASE_URL}assets/og-cover.jpg`,
  `${BASE_URL}assets/leha-avatar.jpg`,
  `${BASE_URL}assets/alabuga-main.jpg`,
  `${BASE_URL}assets/alabuga-room.jpg`,
  `${BASE_URL}assets/alabuga-stairs.jpg`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.all(APP_SHELL.map(async (url) => {
        try {
          await cache.add(url);
        } catch {
          // Не блокируем установку, если отдельный статический файл недоступен.
        }
      }));
      await self.skipWaiting();
    }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith('lehastr-shell-') && key !== CACHE_NAME)
        .map((key) => caches.delete(key)),
    )).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match(`${BASE_URL}index.html`))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    })),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
