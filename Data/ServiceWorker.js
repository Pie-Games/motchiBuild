const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/48b33dba545837a9b75db0f9ab4dddda.loader.js",
    "Build/045491f07f9813cc0886206e41cff88e.framework.js.br",
    "Build/2d82d8398afcae094fc7ed4c9cb477d8.data.br",
    "Build/12d8c5b13030785b14617914e635379b.wasm.br",
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
