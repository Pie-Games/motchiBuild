const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/5655701f5f8909f17d5bd696c9c2d358.loader.js",
    "Build/d6f09bafb8aaff48c30d6dd03d1d4497.framework.js.br",
    "Build/fae3e39fbb949de35208752155a287b9.data.br",
    "Build/dae0f5b33d8978ed9ffa9acd2870c53b.wasm.br",
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
