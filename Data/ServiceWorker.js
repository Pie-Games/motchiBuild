const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/2b9d7adf1c72229cec641f2c71361c52.loader.js",
    "Build/c4c3e1c98df7ee989a2b3fca99cdbfbd.framework.js.br",
    "Build/a82d685df209158a263e2c54f6be6304.data.br",
    "Build/182cd36647b17b89237d886491423020.wasm.br",
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
