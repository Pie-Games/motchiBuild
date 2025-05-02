const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/df97161537b059c0cfb10cf96f93e9ad.loader.js",
    "Build/c4c3e1c98df7ee989a2b3fca99cdbfbd.framework.js.br",
    "Build/e352d2d4b5b1c1013e06a7a89e4c569b.data.br",
    "Build/b8f9ee8d521a4873ca63cbf50b24ec41.wasm.br",
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
