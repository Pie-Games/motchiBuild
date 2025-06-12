const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/f662da26144c01a7a5703581870e4a5f.loader.js",
    "Build/0bf7550b50f2f8f1d8f5f911531abb96.framework.js.br",
    "Build/c601a41f076e7da2ffb04a35cb917029.data.br",
    "Build/cdffdd6f1552eb109d6b76a0400b2b9e.wasm.br",
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
