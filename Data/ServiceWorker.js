const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/8b79c031e831b50759daff856bcb18ac.loader.js",
    "Build/31fbb62d8a4f4bb1c4968db5809862f7.framework.js.br",
    "Build/fc287b3c526e6935fb9d57bf7583deba.data.br",
    "Build/baafcc3bc555d04998a497033e735554.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
