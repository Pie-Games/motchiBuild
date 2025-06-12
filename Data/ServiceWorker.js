const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/560a4f413ad4b86fe5da9f0390c756e2.loader.js",
    "Build/7d4d1fa1eb0daf20c168abd55de46cb0.framework.js.br",
    "Build/0e0d4f6dcf2167b6b0151beface997fb.data.br",
    "Build/7081a88218eb75e8625d9f137db26dd9.wasm.br",
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
