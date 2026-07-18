const CACHE_NAME = 'summer-adventure-pwa-v1784397869595';
const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/map-background.webp",
  "./assets/pig-cape.png",
  "./assets/wobble-sport.webp",
  "./assets/wobble-english.webp",
  "./assets/wobble-calculation.webp",
  "./assets/wobble-go.webp",
  "./assets/wobble-picture.webp",
  "./assets/wobble-writing.webp",
  "./assets/wobble-thinking.webp",
  "./assets/wobble-fun.webp",
  "./assets/wobble-finish.webp",
  "./assets/real-dolphin.wav",
  "./assets/real-seagull.mp3",
  "./assets/real-ship-horn.mp3"
];
const RUNTIME_ASSETS = [];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
      return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  if (url.origin !== location.origin) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok && (SHELL_ASSETS.includes(url.pathname.split('/').pop()) || RUNTIME_ASSETS.some(asset => url.pathname.endsWith(asset.slice(1))))) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
  })));
});
