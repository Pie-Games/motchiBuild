const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/9ed68e819731d1b01c9e9cb70d014f58.loader.js",
    "Build/b8104040d19209442e885f2d0ee3d67b.framework.js.br",
    "Build/0146f09ab93679a11a4517083d1467e5.data.br",
    "Build/cb6730a9fddb3ba574aa2aed52d92133.wasm.br",
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
