const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/abcc4babc7a5e97d3fd7b0e3e381b0cc.loader.js",
    "Build/c281c6914a7a425d82ee485eb9fac469.framework.js.br",
    "Build/70e902c4559a3a1b1309f15fb8881e96.data.br",
    "Build/e5d479ca22d3cc56f3f144467c9a8800.wasm.br",
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
