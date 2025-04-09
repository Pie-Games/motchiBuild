const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/5442fa763ae386576a7312c95be93a59.loader.js",
    "Build/08231c8fe7f60677186613ecd7b02ada.framework.js.br",
    "Build/5ee6381c54bf60a41f88ca5af7a62b5f.data.br",
    "Build/1c2ba7c5a851b7c1fe3bbf3b6df16247.wasm.br",
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
