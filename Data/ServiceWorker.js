const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/acd1c7429af2ffc5883d4a4ca98d6af1.loader.js",
    "Build/d43be50313f753e2667f17491b7fd132.framework.js.br",
    "Build/2f8f79b786a5b460d7ff06521e68f30f.data.br",
    "Build/e15c1eb66a35aec93b901927514dcf07.wasm.br",
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
