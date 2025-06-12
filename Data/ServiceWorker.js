const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/6c6d23ab18f5aae155a3afe216662c31.loader.js",
    "Build/54a021edf864859ac16f5543c99a048e.framework.js.br",
    "Build/9f8b86a6725ae4f2659dbd88693bb5f2.data.br",
    "Build/73d492845cc90fda81aa2947c81dc6d5.wasm.br",
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
