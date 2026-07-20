const APP_CACHE = 'summer-adventure-pwa-v1784542783480';
const MEDIA_CACHE = 'summer-adventure-media-v1';
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
  "./assets/music-island-base.webp",
  "./assets/wobble-mystery.webp",
  "./assets/music-foreground.webp",
  "./assets/real-dolphin.wav",
  "./assets/real-seagull.mp3",
  "./assets/real-ship-horn.mp3"
];
const RUNTIME_ASSETS = [];
let backgroundCachePromise = null;

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeAsset(asset) {
  if (typeof asset !== 'string') return null;
  return new URL(asset, self.location.href).href;
}

async function matchCached(request) {
  return caches.match(request);
}

async function cacheBackgroundTracks(assets) {
  const urls = [...new Set((assets || []).map(normalizeAsset).filter(Boolean))];
  if (!urls.length) return;
  const cache = await caches.open(MEDIA_CACHE);
  for (const url of urls) {
    const cached = await cache.match(url);
    if (!cached) {
      try {
        const response = await fetch(url, { cache: 'reload' });
        if (response.ok) await cache.put(url, response.clone());
      } catch (_) {}
    }
    await wait(850);
  }
}

self.addEventListener('install', event => {
  event.waitUntil(caches.open(APP_CACHE).then(cache => cache.addAll(SHELL_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys
      .filter(key => key !== APP_CACHE && key !== MEDIA_CACHE && !key.startsWith('summer-adventure-pwa-v'))
      .map(key => caches.delete(key))))
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
      caches.open(APP_CACHE).then(cache => cache.put('./index.html', copy));
      return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  if (url.origin !== location.origin) return;
  event.respondWith(matchCached(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok && (SHELL_ASSETS.includes(url.pathname.split('/').pop()) || RUNTIME_ASSETS.some(asset => url.pathname.endsWith(asset.slice(1))))) {
      const copy = response.clone();
      caches.open(APP_CACHE).then(cache => cache.put(request, copy));
    }
    return response;
  })));
});

self.addEventListener('message', event => {
  if (event.data?.type !== 'CACHE_BACKGROUND_TRACKS') return;
  if (!backgroundCachePromise) {
    backgroundCachePromise = cacheBackgroundTracks(event.data.assets).finally(() => {
      backgroundCachePromise = null;
    });
  }
  event.waitUntil(backgroundCachePromise);
});
