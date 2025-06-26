const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/ccf0d5a13b97094e18db963ec391827d.loader.js",
    "Build/920a2d517d5688a5b3fa0ec78b72ac93.framework.js.br",
    "Build/2925150868b5ba038749af3b8765b4f4.data.br",
    "Build/1cb36b6abce32dc595c089766b2839c5.wasm.br",
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
