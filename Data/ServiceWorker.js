const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/e51973f107c3579530e316dc0f495603.loader.js",
    "Build/f7fb53caed2ff5eb1fd5338daad225a6.framework.js.br",
    "Build/ece93ae9e1a3fd5a688cd32870c6a98c.data.br",
    "Build/78e168b2b4b662dd4521cd85fdaa94f0.wasm.br",
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
