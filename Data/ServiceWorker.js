const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/598e1806c69c36550755685c44b864db.loader.js",
    "Build/328a24bb8487ded41dff20581a4f2bf4.framework.js.br",
    "Build/f1977d3997c19ebecf9ffa5780979c2e.data.br",
    "Build/8011534d9f6130d1ba1c75d3886e5233.wasm.br",
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
