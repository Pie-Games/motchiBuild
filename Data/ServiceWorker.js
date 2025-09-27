const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/6fc44dd0e770fc7c6c39e1cd7fb13940.loader.js",
    "Build/36e6dfb1dd519db149ecb004a94b5c6d.framework.js.br",
    "Build/37724b953bb26e680ba3aa4b0b8ae0be.data.br",
    "Build/9ff58831d15b754adf2b9d2ccfd4521f.wasm.br",
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
