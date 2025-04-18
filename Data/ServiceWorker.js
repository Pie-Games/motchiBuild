const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/6f25683245915bc98221f8170900677f.loader.js",
    "Build/328a24bb8487ded41dff20581a4f2bf4.framework.js.br",
    "Build/5d0dc946d5c8e5d23d3ec8b7b4e6e9b7.data.br",
    "Build/f91e481ae4d017093d85edb854287091.wasm.br",
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
