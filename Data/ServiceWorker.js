const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/5e7fe6ea38f6be55b5ad06e86b1b7bf2.loader.js",
    "Build/f4bcb79eef432bb649d9711a428c61b4.framework.js.br",
    "Build/5d417f0bb6ffe40fabe40d3736fae27e.data.br",
    "Build/1afbc072347a4ea7da93185bb284f9eb.wasm.br",
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
