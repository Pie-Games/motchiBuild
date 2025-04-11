const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/8a9d141243fa32e5dfae0fb494f3d612.loader.js",
    "Build/4f5902edc855465bc80e252871b21531.framework.js.br",
    "Build/e0262f4c2d4180cd9de902fec16a1929.data.br",
    "Build/1727ac5100af25b51e628879a38dc951.wasm.br",
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
