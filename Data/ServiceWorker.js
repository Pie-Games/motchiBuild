const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/47ac3673805e2cb4533c8fc4ae24fdbf.loader.js",
    "Build/022916beef7b9e78436e1d183e4fc7f0.framework.js.br",
    "Build/7339c92e69c9cca5d432e16ee3fd1a9b.data.br",
    "Build/5acc30987e5718bec0d162d15446b4e5.wasm.br",
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
