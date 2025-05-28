const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/b95a8c890cf7f0143bd521e7877fcd43.loader.js",
    "Build/4bfc0de2067aa4649a61e1a7fefa4709.framework.js.br",
    "Build/961fd2c241958e819393354dab4c9460.data.br",
    "Build/878c3c395c3f9980320ff90930250a1f.wasm.br",
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
