const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/1dcd468f1be7dd5285e364d6b5612ca5.loader.js",
    "Build/130ba132ff4a918cddbd1a1ca3a0dbcb.framework.js.br",
    "Build/0f686652562a9cbd72aef7c9e518837b.data.br",
    "Build/e1cd31bb2448c0957b0b6763623be1c0.wasm.br",
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
