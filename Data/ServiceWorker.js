const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/1a2dc7401cded1efef4da0051a94ba68.loader.js",
    "Build/c4c3e1c98df7ee989a2b3fca99cdbfbd.framework.js.br",
    "Build/a770a76a984f3122902887fbeda281af.data.br",
    "Build/53f6c5cff97a4836319edc5e70336dbd.wasm.br",
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
