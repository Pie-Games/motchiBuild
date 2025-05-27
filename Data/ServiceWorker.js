const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/72b41a5c64783d383bcd35a19c2d54c0.loader.js",
    "Build/b6c03b17794c9b3e06207e79af0e036b.framework.js.br",
    "Build/a25dab1059b7f2f659851ca36de111e9.data.br",
    "Build/69e778e5135c9f5a65b07ab8b477deb2.wasm.br",
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
