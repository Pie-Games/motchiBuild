const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/bc3a386f8be719139b0e7c272525a290.loader.js",
    "Build/9375aed190263c97bc8e2974a2c55a5d.framework.js.br",
    "Build/4d606b7d9af5a2c8a73148fbdef165ac.data.br",
    "Build/18d614e36cbbd94506251a4be3e1f62b.wasm.br",
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
