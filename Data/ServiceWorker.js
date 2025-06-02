const cacheName = "DefaultCompany-motchi-1.0";
const contentToCache = [
    "Build/5aa54ea80eb193ed0bb0fa24139f97db.loader.js",
    "Build/ac88148e47cf000af1364fab36e65211.framework.js.br",
    "Build/68eabd7908fc596f31142377ce89c09d.data.br",
    "Build/968c792fec91a8efa9c63324603e022c.wasm.br",
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
