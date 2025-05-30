const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/a2ef6bc4e9ca800bd798995cef3cbfdb.loader.js",
    "Build/b8104040d19209442e885f2d0ee3d67b.framework.js.br",
    "Build/878947d881da46a3498c0533f39d150c.data.br",
    "Build/0651bb41bc5f0595c08f5bbf0a849440.wasm.br",
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
