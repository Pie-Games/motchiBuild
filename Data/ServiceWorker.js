const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/90dc67f31bb33e495250f742c22ef1b4.loader.js",
    "Build/c4c3e1c98df7ee989a2b3fca99cdbfbd.framework.js.br",
    "Build/800634d5359bff1b0277c9b466206e77.data.br",
    "Build/9eaf0540481b46c8201536c1ba690a17.wasm.br",
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
